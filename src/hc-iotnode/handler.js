/**
* @name Handler
* @description Handle incoming hydra message
*/
'use strict';

const util = require('util');
const vm = require('vm');
const jsUtils = require('fwsp-jsutils');
const hydra = require('fwsp-hydra');
const SCRIPT_TIMEOUT = 15000;

class Handler {
  constructor() {
  }

  process(message) {
    let msg = hydra.createUMFMessage(message);
    let instanceID = hydra.getInstanceID();
    let serviceName = hydra.getServiceName();
    let from = `${instanceID}@${serviceName}:/`;
    let code = new Buffer(msg.body.code, 'base64').toString('ascii');

    if (!code) {
      let replyMessage = hydra.createUMFMessage({
        from,
        body: {
          error: 'Invalid code block'
        }
      });
      hydra.sendReplyMessage(msg, replyMessage.toJSON());
    } else {
      try {
        /* code should be wrapped in an IIEF
          (function() {
            return {
              message: 'hello'
            };
          })();
        */
        let wrappedCode = `var result = ${code};`;
        let script = new vm.Script(wrappedCode);
        let sandbox = [{}];
        script.runInNewContext(sandbox, {
          filename: 'remote_script',
          lineOffset: 1,
          columnOffset: 1,
          displayErrors: true,
          timeout: SCRIPT_TIMEOUT
        });
        hydra.sendReplyMessage(msg.toJSON(), hydra.createUMFMessage({
          body: {
            result: sandbox.result
          }
        }).toJSON());
      } catch(e) {
        hydra.sendReplyMessage(msg.toJSON(), hydra.createUMFMessage({
          body: {
            error: `${e.message} - ${e.stack}`
          }
        }).toJSON());
      }
    }
  }
}

module.exports = new Handler();
