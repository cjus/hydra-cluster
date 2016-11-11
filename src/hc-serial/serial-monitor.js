const SerialPort = require('serialport');
const hydra = require('fwsp-hydra');
const UMFMessage = require('fwsp-umf-message');

const portName = '/dev/ttyUSB0';

class SerialMonitor {
  constructor() {
  }

  init() {
    this.serial = new SerialPort(portName, {
      baudRate: 9600,
      dataBits: 8,
      parity: 'none',
      stopBits: 1,
      flowControl: false
    });

    this.serial.on('open', () => {
      console.log('Open Connection');
    });

    this.serial.on('data', (data) => {
      let ds = data.toString();
      let message;

      if (ds.indexOf(':') > -1) {
        message = UMFMessage.createMessage({
          to: 'hc-constats:/',
          from: 'mcp:/',
          body: {
            ts: ds.substring(0, ds.length - 1)
          }
        });
      } else {
        message = UMFMessage.createMessage({
          to: 'hc-constats:/',
          from: 'hc-mcp:/',
          body: {
            tp: ds.trim()
          }
        });
      }
      hydra.sendMessage(message.toJSON());
    });

    this.serial.on('error', (err) => {
      console.log('Error: ', err.message);
    });
  }
}

module.exports = new SerialMonitor();
