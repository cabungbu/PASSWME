class post {
  constructor({
    title,
    category,
    image,
    status,
    price,
    description,
    service,
    start,
    end,
    owner,
    oldNew,
    soldQuantity = 0, // Giá trị mặc định
  }) {
    this.title = title;
    this.category = category;
    this.image = image;
    this.status = status;
    this.price = price;
    this.description = description;
    this.service = service;
    this.start = start;
    this.end = end;
    this.owner = owner;
    this.oldNew = oldNew;
    this.soldQuantity = soldQuantity;
  }

  toPlainObject() {
    return {
      title: this.title,
      category: this.category,
      image: this.image,
      status: this.status,
      price: this.price,
      description: this.description,
      service: this.service,
      start: this.start,
      end: this.end,
      owner: this.owner,
      oldNew: this.oldNew,
      soldQuantity: this.soldQuantity,
    };
  }
}

module.exports = post; // Xuất lớp Post
