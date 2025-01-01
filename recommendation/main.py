import firebase_admin
from firebase_admin import credentials, firestore
import os
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from flask import Flask as flask
from flask import jsonify, request
from sklearn.metrics.pairwise import cosine_similarity
import random

app = flask(__name__)

# Đường dẫn đến tệp chìa khóa dịch vụ
service_account_path = os.path.join(os.path.dirname(__file__), "serviceAccountKey.json")

# Khởi tạo ứng dụng Firebase
cred = credentials.Certificate(service_account_path)
firebase_admin.initialize_app(cred)

db = firestore.client()

def getAllPost():
    # Lấy tất cả tài liệu trong collection 'posts'
    posts_ref = db.collection('posts')
    docs = posts_ref.stream()

    all_posts = []

    # Lưu trữ các tài liệu vào danh sách
    for doc in docs:
        post_data = doc.to_dict()
        post_data['id'] = doc.id
        
        # Lấy subcollection products của mỗi post
        products_ref = posts_ref.document(doc.id).collection('products')
        products = products_ref.stream()
        
        # Lưu products vào post_data
        post_data['products'] = []
        for product in products:
            product_data = product.to_dict()
            product_data['id'] = product.id
            
        all_posts.append(post_data)
    
    return all_posts

def combineFeatures(row):
    return str(row['title']) + " " + str(row['description'])

#api: http://localhost:3030/recommendation/?id=F4gfOb7qNjCNNaNSEFGY
@app.route('/recommendation/', methods=['GET'])
def get_recommendations():
    # Lấy tất cả bài viết và chuyển đổi thành DataFrame
    posts = getAllPost()
    all_posts_df = pd.DataFrame(posts)

    productid = request.args.get('id')
    if productid not in all_posts_df['id'].values:
        return jsonify({'error': 'Post not found'})
    indexproduct = all_posts_df[all_posts_df['id'] == productid].index[0]

    # Kiểm tra xem DataFrame có cột 'title' và 'description' không
    if 'title' in all_posts_df.columns and 'description' in all_posts_df.columns:
        all_posts_df['combineFeatures'] = all_posts_df.apply(combineFeatures, axis=1)
    
    # Tính toán TF-IDF và độ tương đồng
    tf = TfidfVectorizer()
    tfMatrix = tf.fit_transform(all_posts_df['combineFeatures'])

    similar = cosine_similarity(tfMatrix)
    similarProduct = list(enumerate(similar[indexproduct]))

    # Sắp xếp các sản phẩm tương tự
    sortedSimilarProduct = sorted(similarProduct, key=lambda x: x[1], reverse=True)
    
   
    # Lấy 10 sản phẩm gợi ý
    number = 10
    result = []
    for i in range(1, min(number + 1, len(sortedSimilarProduct))):
        # Tạo một dictionary chứa các thông tin của sản phẩm
        post = {
            'id': all_posts_df.iloc[sortedSimilarProduct[i][0]]['id'],
            'title': all_posts_df.iloc[sortedSimilarProduct[i][0]]['title'],
            'images': all_posts_df.iloc[sortedSimilarProduct[i][0]]['images'],
            'start': all_posts_df.iloc[sortedSimilarProduct[i][0]]['start'],
        }
        result.append(post)
    
    # Trả về kết quả dưới dạng JSON
    return jsonify({'Recommendation': result})


@app.route('/home_recommendation/', methods=['GET'])
def get_home_recommendations():
    userid = request.args.get('id')
    user_ref = db.collection('users').document(userid)
    user_doc = user_ref.get()
    user_data = user_doc.to_dict()
    history = user_data.get('searchHistory', [])
    all_posts = getAllPost()

    all_posts_df = pd.DataFrame(all_posts)

    if history:
        history = str(history[0])  # Đảm bảo history là chuỗi
    else:
        # Nếu không có lịch sử, trả về danh sách ngẫu nhiên
        random_posts = random.sample(all_posts, min(10, len(all_posts)))
        random_posts_serializable = [{
            'id': post['id'],
            'title': post['title'],
            'images': post['images'],
            'start': post['start']
        } for post in random_posts]

        return jsonify({'Recommendation': random_posts_serializable})
      
    # Tạo DataFrame cho history
    history_df = pd.DataFrame({'title': [history]})
    history_df['title'] = history_df['title'].astype(str)

    # Tính toán TF-IDF cho tất cả tiêu đề
    tf = TfidfVectorizer()
    tfMatrix = tf.fit_transform(all_posts_df['title'].tolist() + history_df['title'].tolist())

    # Tính toán độ tương đồng
    similar = cosine_similarity(tfMatrix)

    # Độ tương đồng giữa history (vị trí cuối cùng) và tất cả bài viết khác
    history_similarity = similar[:-1, -1]  # Lấy hàng tương ứng với history

    # Thêm độ tương đồng vào DataFrame
    all_posts_df['similarity'] = history_similarity
    sorted_posts = all_posts_df.nlargest(10, 'similarity')  # Lấy 10 bài có độ tương đồng cao nhất

    # Tạo danh sách kết quả
    result = sorted_posts[['id', 'title', 'images', 'start']].to_dict(orient='records')

    # Trả về kết quả dưới dạng JSON
    return jsonify({'Recommendation': result})

# Chạy ứng dụng Flask
if __name__ == "__main__":
    app.run(port=3030)