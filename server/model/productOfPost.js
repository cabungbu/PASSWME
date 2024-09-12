class product {
  constructor(name, price, quantity, image) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.image = image;
  }

  toPlainObject() {
    return {
      name: this.name,
      price: this.price,
      quantity: this.quantity,
      image: this.image,
    };
  }
}
module.exports = product;
