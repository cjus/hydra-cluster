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
const umfMessage = require('fwsp-umf-message');
const version = require('./package.json').version;

const blessed = require('blessed');
const contrib = require('blessed-contrib');

class Handler {
  constructor() {
    this.screen = blessed.screen({
      smartCSR: true
    });
    this.upTimeBox = null;
    this.tempBox = null;
    this.logBox = null;
  }

  launch() {
    let grid = new contrib.grid({rows: 12, cols: 12, screen: this.screen});

    this.upTimeBox = grid.set(0, 0, 6, 6, contrib.lcd, {
      label: 'Uptime',
      tags: true,
      color: 'green',
      display: '     ',
      elements: 5
    });

    this.tempBox = grid.set(0, 6, 6, 6, contrib.lcd, {
      label: 'Temp',
      tags: true,
      color: 'green',
      display: '    ',
      elements: 4,
      elementPadding: 4
    });

    this.logBox = grid.set(6, 0, 6, 12, contrib.log, {
      fg: 'lightgreen',
      selectedFg: 'green',
      label: 'Cluster Log'
    });

    // Quit on Escape, q, or Control-C.
    this.screen.key(['escape', 'q', 'C-c'], (ch, key) => {
      return process.exit(0);
    });

    this.setupMessageHandler();
    this.screen.render();
  }

  setupMessageHandler() {
    hydra.on('message', (message) => {
      if (message.bdy.ts) {
        let minsec = message.bdy.ts.substring(6);
        this.upTimeBox.setDisplay(minsec);
      }
      if (message.bdy.tp) {
        let num = message.bdy.tp.substring(0, 2);
        this.tempBox.setDisplay(`${num} F`);
      }
      if (message.bdy.log) {
        this.logBox.log(message.bdy.log);
      }
      this.screen.render();
    });
  }
}

module.exports = new Handler();
