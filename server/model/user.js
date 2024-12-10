class user {
  constructor({ username, email, password, phone, avatar }) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.avatar = avatar;
    this.address = address || ""; 
    this.posts = posts || []; 
    this.order = order || [];
    this.customerOrder = customerOrder || [];
    this.bought = [];
    this.shopcart = [];
    this.like = [];
  }
  toPlainObject() {
    return {
      username: this.username,
      email: this.email,
      password: this.password,
      phone: this.phone,
      avatar: this.avatar,
      address: this.address,
      posts: this.posts,
      order:this.order,
      customerOrder: this.customerOrder,
      bought: this.bought,
      shopcart: this.shopcart,
      like: this.like,
    };
  }
}
module.exports = user;
