/**
* @name IOTHandler
* @description Handle incoming hydra message
*/
const hydra = require('fwsp-hydra');
const version = require('./package.json').version;
let config = require('fwsp-config');
const UMFMessage = require('fwsp-umf-message');

config.init('./config/config.json')
  .then(() => {
    config.version = version;
    config.hydra.serviceVersion = version;
    hydra.init(config.hydra)
      .then(() => {
        let message = UMFMessage.createMessage({
          to: 'hc-pylights:/',
          from: 'tester:/',
          body: {
            cmd: process.argv[2]
          }
        });
        setTimeout(() => {
          process.exit();
        }, 1000);
        return hydra.sendMessage(message);
      })
      .catch((err) => {
        console.log('err', err);
      });
  });
