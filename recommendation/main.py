import firebase_admin
from firebase_admin import credentials, firestore
import os
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from flask import Flask as flask
from flask import jsonify, request
from sklearn.metrics.pairwise import cosine_similarity

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
        owner_ref = post_data.get('owner')  # Lấy reference đến owner
        
        if owner_ref:
            owner_doc = owner_ref.get()  # Lấy dữ liệu từ reference
            if owner_doc.exists:
                post_data['owner'] = owner_doc.to_dict()  # Thay thế owner với dữ liệu thực tế

        all_posts.append(post_data)

    return all_posts

def combineFeatures(row):
    return str(row['title']) + " " + str(row['description'])

#api: http://localhost:3030/recommendation/?id=123
@app.route('/recommendation', methods=['GET'])
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
    number = 5
    result = []
    for i in range(1, min(number + 1, len(sortedSimilarProduct))):
        # Tạo một dictionary chứa các thông tin của sản phẩm
        post = {
            'id': all_posts_df.iloc[sortedSimilarProduct[i][0]]['id'],
            'title': all_posts_df.iloc[sortedSimilarProduct[i][0]]['title'],
            'images': all_posts_df.iloc[sortedSimilarProduct[i][0]]['images'],
            'start': all_posts_df.iloc[sortedSimilarProduct[i][0]]['start']
        }
        result.append(post)
    
    # Trả về kết quả dưới dạng JSON
    return jsonify({'Recommendation': result})

# Chạy ứng dụng Flask
if __name__ == "__main__":
    app.run(port=3030)