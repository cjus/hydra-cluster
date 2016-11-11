/**
 * @name mcp-v1-api
 * @description This module packages the MCP API.
 */
'use strict';

const path = require('path');
const hydraExpress = require('fwsp-hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
const ServerResponse = require('fwsp-server-response');
const UMFMessage = require('fwsp-umf-message');

let config = require('fwsp-config');
let serverResponse = new ServerResponse();
serverResponse.enableCORS(true);

let api = express.Router();

/**
 * @name login
 * @summary Login Endpoint.
 * @param {object} req - express request object.
 * @param {object} res - express response object
 */
api.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (username === 'cjus' && password === 'fake_password') {
    serverResponse.sendOk(res, {
      result: {
        isValid: true,
        token: '7656c62d-c3d6-402e-ba44-4c828a1068a1',
        user: {
          id: 0,
          name: 'Carlos',
          role: 'admin'
        }
      }
    });
  } else {
    serverResponse.sendInvalidUserCredentials(res, {
      result: {
        isValid: false,
        reason: 'Invalid credentials'
      }
    });
  }
});

api.get('/list/services', (req, res) => {
  let message = {
    to: 'hydra-router:[GET]/v1/router/list/services',
    from: 'hc-mcp:/',
    body: {}
  };

  let msg = hydra.createUMFMessage(message).toJSON();
  hydra.makeAPIRequest(msg)
    .then((data) => {
      serverResponse.sendOk(res, {
        result: data.result
      });
    })
    .catch((err) => {
      console.log('err', err);
    });
});

api.post('/command', (req, res) => {
  let command = req.body.cmd;
  let commandSegments = command.split(' ');

  if (commandSegments[0] === 'cluster') {
    let commandType;
    let message = UMFMessage.createMessage({
      to: 'hc-pylights:/',
      from: 'hc-mcp:/',
      body: {
        cmd: null
      }
    });

    switch (command) {
      case 'cluster init':
        message.body.cmd = 'blue';
        commandType = 'initialization';
        break;
      case 'cluster ready':
        message.body.cmd = 'green';
        commandType = 'ready';
        break;
      case 'cluster thinking':
        message.body.cmd = 'thinking';
        commandType = 'thinking';
        break;
      case 'cluster error':
        message.body.cmd = 'red';
        commandType = 'error';
        break;
      case 'cluster reset':
        message.body.cmd = 'off';
        commandType = 'reset';
        break;
    }

    hydra.sendMessage(message.toJSON());
    message = UMFMessage.createMessage({
      to: 'hc-constats:/',
      from: 'hc-mcp:/',
      body: {
        log: `Cluster entering ${commandType} state`
      }
    });
    hydra.sendMessage(message.toJSON());
    serverResponse.sendOk(res, {
      result: []
    });
  } else if  (commandSegments[0] === 'router') {
    let message = UMFMessage.createMessage({
      to: `hydra-router:[GET]/v1/router/list/${commandSegments[1]}`,
      from: 'hc-mcp:/',
      body: {}
    });
    hydra.makeAPIRequest(message.toJSON())
      .then((data) => {
        serverResponse.sendOk(res, {
          result: data.result
        });
      });
  }
});

module.exports = api;
