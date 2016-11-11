/**
* @name Hydra Cluster Serial Service
* @description This is the service entry point
*/
'use strict';

const hydra = require('fwsp-hydra');
const version = require('./package.json').version;
const serialMonitor = require('./serial-monitor');

let config = require('fwsp-config');
config.init('./config/config.json')
  .then(() => {
    config.version = version;
    config.hydra.serviceVersion = version;

    /**
    * Initialize hydra
    */
    hydra.init(config.hydra)
      .then(() => {
        return hydra.registerService();
      })
      .then((serviceInfo) => {
        serialMonitor.init();
      })
      .catch((err) => {
        console.log('err', err);
      });
  });
