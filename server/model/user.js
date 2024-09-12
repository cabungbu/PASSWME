class user {
  constructor({ username, email, password, phone, avatar, gender }) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.avatar = avatar;
    this.gender = gender;
    this.sold = [];
    this.bought = [];
    this.shopcart = [];
    this.like = [];
    this.address = [];
    this.chosenAddress = "";
  }
  toPlainObject() {
    return {
      username: this.username,
      email: this.email,
      password: this.password,
      phone: this.phone,
      avatar: this.avatar,
      gender: this.gender,
      sold: this.sold,
      bought: this.bought,
      shopcart: this.shopcart,
      like: this.like,
      address: this.address,
      chosenAddress: this.chosenAddress,
    };
  }
}
module.exports = user;
