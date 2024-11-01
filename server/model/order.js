class order {
    constructor({
      buyerId,
      sellerId,
      postIds,
      note,
      from,
      to,
      status,
      orderDate
    }) {
      this.buyerId = buyerId;
      this.sellerId = sellerId;
      this.postIds = postIds|| [];
      this.note = note;
      this.from = from;
      this.to = to;
      this.status = status;
      this.orderDate = orderDate;
    }
  
    toPlainObject() {
      return {
        buyerId: this.buyerId,
        sellerId: this.sellerId,
        postIds: this.postIds,
        note: this.note,
        from: this.from,
        to: this.to,
        status: this.status,
        orderDate: this.orderDate,
      };
    }
  }
  
  module.exports = order; // Xuất lớp Post
  