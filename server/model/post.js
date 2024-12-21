class post {
  constructor({
    title,
    category,
    images,
    video,
    status,
    description,
    service,
    start,
    owner,
    condition,
    address,
    soldQuantity = 0, // Giá trị mặc định
    rating = 0,
  }) {
    this.title = title;
    this.category = category;
    this.images = images || [];
    this.video = video;
    this.status = status;
    this.description = description;
    this.service = service;
    this.start = start;
    this.owner = owner;
    this.condition = condition;
    this.address = address;
    this.soldQuantity = soldQuantity;
    this.rating = rating;
  }

  toPlainObject() {
    return {
      title: this.title,
      category: this.category,
      images: this.images,
      video: this.video,
      status: this.status,
      description: this.description,
      service: this.service,
      start: this.start,
      owner: this.owner,
      condition: this.condition,
      address: this.address,
      soldQuantity: this.soldQuantity,
      rating: this.rating
    };
  }
}

module.exports = post; // Xuất lớp Post
