'use strict';

const http = require('node:http');

const DEFAULT_ROUTES = {
  '': () => ({ hello: 'world' })
}
const FALLBACK = () => ({ error: '404' });
const serialize = (value) => JSON.stringify(value);

module.exports = (config = {}) => {
  const logger = config.logger || console;
  const PORT = config.port || 3000;
  const routes = config.routes || DEFAULT_ROUTES;
  const fallback = config.fallback || FALLBACK;

  const serveRequest = (req, res) => {
    const { url, method } = req;
    logger.info(`${method} request on route: ${url}`);
    const route = url.startsWith('/') ? url.slice(1) : url;
    const handler = routes[route] || fallback;
    const response = handler();
    logger.info(response);
    res.end(serialize(response));
  }

  const server = new http.createServer(serveRequest);
  server.listen(PORT);
  logger.info(`http server start on http://127.0.0.1:${PORT}`);

  return () => server.close();
}
