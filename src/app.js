'use strict';

const http = require('./infra/http.js');

const app = async () => {
  console.log('App is running...');

  const routes = {
    '': () => 'hello, world!',
    'time': () => new Date()
  };
  const fallback = () => 'WRONG PLACE TO SNEAK :)';
  const server = http({ routes, fallback });
}

module.exports = app;
