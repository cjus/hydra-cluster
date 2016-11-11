/**
* @name Handler
* @description Handle incoming hydra message
*/
const XProcess = require('xprocess');
const UMFMessage = require('fwsp-umf-message');

class Handler {
  constructor() {
    this.xProcess = null;
  }

  process(msg) {
    console.log('msg.bdy.cmd', msg.bdy.cmd);
    if (this.xProcess) {
        this.xProcess.close();
    }
    this.xProcess = XProcess.createClient();
    this.xProcess.run('python', [`${msg.bdy.cmd}.py`]);
  }
}

module.exports = new Handler();
