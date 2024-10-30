class post {
  constructor({
    title,
    category,
    image,
    status,
    description,
    service,
    start,
    owner,
    condition,
    soldQuantity = 0, // Giá trị mặc định
  }) {
    this.title = title;
    this.category = category;
    this.image = image;
    this.status = status;
    this.description = description;
    this.service = service;
    this.start = start;
    this.owner = owner;
    this.condition = condition;
    this.soldQuantity = soldQuantity;
  }

  toPlainObject() {
    return {
      title: this.title,
      category: this.category,
      image: this.image,
      status: this.status,
      description: this.description,
      service: this.service,
      start: this.start,
      owner: this.owner,
      condition: this.condition,
      soldQuantity: this.soldQuantity,
    };
  }
}

module.exports = post; // Xuất lớp Post
