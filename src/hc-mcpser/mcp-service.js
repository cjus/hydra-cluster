/**
* @name MCP Service
* @description This is the service entry point
*/
'use strict';

const http = require('http');
const cluster = require('cluster');
const os = require('os');
const version = require('./package.json').version;
const hydraExpress = require('fwsp-hydra-express');
let config = require('fwsp-config');

/**
* Load configuration file and initialize hydraExpress app.
*/
config.init('./config/config.json')
  .then(() => {
    config.version = version;

    hydraExpress.init(config.getObject(), version, () => {
      hydraExpress.registerRoutes({
        '/v1/mcp': require('./routes/mcp-v1-routes')
      });
    })
      .then((serviceInfo) => {
      })
      .catch((err) => {
        console.log('err', err);
      });
  });
