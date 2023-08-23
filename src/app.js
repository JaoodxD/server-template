'use strict';

const path = require('node:path');
const http = require('./infra/http.js');
const { loadDir } = require('./lib/loader.js');


const app = async () => {
  console.log('App is running...');

  const servicesPath = path.join(__dirname, 'services');
  const services = await loadDir(servicesPath, {});

  console.log(services);

  const routes = {
    '': () => 'hello, world!',
    'time': () => new Date()
  };
  const fallback = () => 'WRONG PLACE TO SNEAK :)';
  const server = http({ routes: services, fallback });
}

module.exports = app;
