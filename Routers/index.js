const express = require('express');
const homeRouter = require('./homeRouter');
const productsRouter = require('./productsRouter');
const categoriesRouter = require('./categoriesRouter');
const allRouter = require('./allRouter');

const routerApi = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/', homeRouter);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('*', allRouter);
}

module.exports = routerApi;