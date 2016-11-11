import fetch from 'isomorphic-fetch';
import querystring from 'querystring';
import config from 'config/config.json';

export default class APIClient {
  constructor() {
    this.apiUrl = `${config.apiServer.targetServer}/${config.apiServer.version}`;
  }

  /**
   * @name makeRequest
   * @description API request method
   * @param {Object} options - request options
   * @returns {Object} Promise
   * @notes The options param may contains the following properties.
   * When missing a property is set to the defualt values listed below.
   *    method: HTTP method: get, post, put, delete. Defaults to 'get'.
   *    endpoint: RESTful endpoint, ex: user/self.json
   *    body: An object containing properties. When use with the GET or DELETE
   *          method the properties are converted to querystring parameters,
   *          for POST and PUT the body is expected to be JSON compliant.
   */
  makeRequest(options) {
    return new Promise((resolve, reject) => {
      if (!options.endpoint) {
        throw new Error('makeRequest: endpoint is a required options field');
        return;
      }

      const defaultOptions = {
        contentType: 'application/json',
        method: 'get',
        body: {}
      };

      options = Object.assign({}, defaultOptions, options);

      let data = {
      };

      let url = `${this.apiUrl}/${options.endpoint}`;
      if (options.method === 'get' || options.method === 'delete') {
        url = `${url}?${querystring.stringify(options.body)}`;
      }
      if (['delete','post','put'].indexOf(options.method) > -1) {
        data = Object.assign({}, data, options);
        data.headers = {
          'Content-Type': options.contentType
        };
        if (typeof data.body === 'object') {
          data.body = JSON.stringify(data.body);
        }
      }

      fetch(url, data)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          return json;
        })
        .then(resolve)
        .catch(reject);
    });
  }
}
