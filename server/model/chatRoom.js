class chatRoom {
  constructor({
    participants = [],
    lastMessage = null,
    unreadCount = {},
  }) {
    this.participants = participants;
    this.lastMessage = lastMessage;
    this.unreadCount = unreadCount;
  }

  toPlainObject() {
    return {
      participants: this.participants,
      lastMessage: this.lastMessage,
      unreadCount: this.unreadCount,
    };
  }
}

module.exports = chatRoom;
