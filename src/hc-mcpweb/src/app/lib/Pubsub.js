/**
* @name PubSub
* @summary Simple ES6 based PubSub implementation with JavaScript - adopted from Addy Osmani's design patterns book.
*/
export default class PubSub {
  constructor() {
    this.topics = {};
    this.subUid = -1;
  }

  subscribe(topic, func) {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }
    let token = (++this.subUid).toString();
    this.topics[topic].push({
      token,
      func
    });
    return token;
  }

  publish(topic, args) {
    if (!this.topics[topic]) {
      return false;
    }
    setTimeout(() => {
      let subscribers = this.topics[topic];
      let len = subscribers ? subscribers.length : 0;
      while (len--) {
        subscribers[len].func(topic, args);
      }
    }, 0);
    return true;
  }

  unsubscribe(token) {
    for (let m in this.topics) {
      if (this.topics[m]) {
        for (let i = 0, j = this.topics[m].length; i < j; i++) {
          if (this.topics[m][i].token === token) {
            this.topics[m].splice(i, 1);
            return token;
          }
        }
      }
    }
    return false;
  }
}
