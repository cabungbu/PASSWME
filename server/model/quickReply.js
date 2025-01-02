class QuickReply {
  constructor(data) {
    this.question = data.question;
    this.answer = data.answer;
    this.value = data.value;
  }

  toPlainObject() {
    return {
      question: this.question,
      answer: this.answer,
      value: this.value,
    };
  }
}
