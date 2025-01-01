class Feedback {
  constructor(rating, comment, images = [], video="") {
    this.rating = rating;
    this.comment = comment;
    this.images = images;
    this.video = video;
    this.createdAt = new Date().toISOString();
  }

  toFirestore() {
    return {
      rating: this.rating,
      comment: this.comment,
      images: this.images,
      video: this.video,
      createdAt: this.createdAt,
    };
  }
}
module.exports = Feedback;
