var jsdom = require('jsdom');

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
// isomorphic-fetch is using the "self" global variable
global.window = global.self = document.defaultView;
global.navigator = global.window.navigator;
