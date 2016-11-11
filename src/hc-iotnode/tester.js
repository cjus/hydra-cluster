/**
* @name IOTHandler
* @description Handle incoming hydra message
*/
const hydra = require('fwsp-hydra');
const version = require('./package.json').version;
let config = require('fwsp-config');
const UMFMessage = require('fwsp-umf-message');

let configObj = {
  'version': version,
  'hydra': {
    'serviceName': 'tester',
    'serviceDescription': 'iotnode tester',
    'serviceIP': '',
    'servicePort': 9035,
    'serviceType': 'test',
    'serviceVersion': version,
    'redis': {
      'url': '127.0.0.1',
      'port': 6379,
      'db': 15
    }
  }
};

let jsCode = `
  let a = 12;
  function process(a) {
    while (true) {

    }
    return a * 3.14;
  }
  var result = process(a);
`;

hydra.init(configObj.hydra)
  .then(() => {
    return hydra.registerService();
  })
  .then(() => {
    hydra.on('message', (message) => {
      console.log('message', message);
      hydra.shutdown();
      process.exit();
    });

    let message = UMFMessage.createMessage({
      to: 'hc-iotnode:/',
      from: 'tester:/',
      body: {
        code: new Buffer(jsCode).toString('base64')
      }
    });
    return hydra.sendMessage(message);
  })
  .catch((err) => {
    console.log('err', err);
  });
