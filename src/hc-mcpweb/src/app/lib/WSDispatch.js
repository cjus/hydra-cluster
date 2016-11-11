export default class WSDispatch {
  constructor() {
    this.wsMessages = {}
  }

  sendMessage(ws, message, callback) {
    if (callback) {
      this.wsMessages[message.mid] = callback;
    }
    ws.send(JSON.stringify(message));
  }

  handleMessage(message) {
    let msg = JSON.parse(message);
    if (msg.rmid && this.wsMessages[msg.rmid]) {
      this.wsMessages[msg.rmid](msg);
      delete this.wsMessages[msg.rmid];
    }
  }
}
