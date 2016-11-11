/**
* @name Service
* @description This is the service entry point
*/
'use strict';

const http = require('http');
const cluster = require('cluster');
const os = require('os');
const hydra = require('fwsp-hydra');
const Utils = require('fwsp-jsutils');
const version = require('./package.json').version;
const handler = require('./handler');

let config = require('fwsp-config');
config.init('./config/config.json')
  .then(() => {
    config.version = version;
    config.hydra.serviceVersion = version;

    /**
    * Handling for process invocation as a process master or child process.
    */
    if (config.cluster !== true) {
      initWorker();
    } else {
      if (cluster.isMaster) {
        const numWorkers = config.processes || os.cpus().length;
        console.log(`${config.hydra.serviceName} (v.${config.version})`);
        console.log(`Using environment: ${config.environment}`);
        console.log('info', `Master cluster setting up ${numWorkers} workers...`);

        for (let i = 0; i < numWorkers; i++) {
          cluster.fork();
        }

        /**
         * @param {object} worker - worker process object
         */
        cluster.on('online', (worker) => {
          console.log(`Worker ${worker.process.pid} is online`);
        });

        /**
         * @param {object} worker - worker process object
         * @param {number} code - process exit code
         * @param {number} signal - signal that caused the process shutdown
         */
        cluster.on('exit', (worker, code, signal) => {
          console.log(`Worker ${worker.process.pid} died with code ${code}, and signal: ${signal}`);
          console.log('Starting a new worker');
          cluster.fork();
        });
      } else {
        initWorker();
      }
    }
  });

/**
* @name initWorker
* @summary Initialize the core process functionality.
*/
function initWorker() {
  /**
  * Initialize hydra for use by Service Router.
  */
  hydra.init(config.hydra)
    .then(() => {
      return hydra.registerService();
    })
    .then((serviceInfo) => {
      let logEntry = `Starting hydra-router service ${serviceInfo.serviceName} on port ${serviceInfo.servicePort}`;
      hydra.sendToHealthLog('info', logEntry);
      console.log(logEntry);

      hydra.on('log', (entry) => {
        console.log('>>>> ', entry);
      });

      handler.launch();
    })
    .catch((err) => {
      console.log('err', err);
    });
}
