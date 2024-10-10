const express = require('express');
const ProductServices = require('../services/productServices');
// const ProductsMiddleware = require('../middlewares/productsMiddleware');
const validatorHandler = require('../middlewares/validator.handler');
const {validateIdProduct, createProductSchema, updateProductSchema, updatePatchProductSchema} = require('../schemas/product.schema');

const router = express.Router();
const services = new ProductServices();

router.get('/', (req, res) => {
  const {limit = 10, offset} = req.query;
  if(services.products.length === 0){
    services.limit = limit;
    services.offset = offset;
    services.buildData();
  }
  const products = services?.find();
  if(typeof products === 'string'){
    return res.status(400).send(products);
  }
  res.status(200).json(products);
});

router.get('/:idProduct', 
  validatorHandler(validateIdProduct, 'params'),
  (req, res, next) => {
  try {
    const {idProduct} = req.params;
    const productResponse = services.findProductById(idProduct);
    // if(typeof productResponse === 'string'){
    //   res.status(404).json({
    //     message: productResponse
    //   });
    //   return;
    // }
    res.status(200).json(productResponse);
  } catch (error) {
    next(error);
  }
});

router.post('/', 
  validatorHandler(createProductSchema, 'body'),
  (req, res) => {
  const body = req.body;
  const createdResponse = services.create(body);
  if(typeof createdResponse === 'string'){
    return res.status(400).send(createdResponse);
  }
  res.status(201).json({
    message: 'Created',
    data: createdResponse
  })
});

router.put('/:idProduct', 
  validatorHandler(validateIdProduct, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  (req, res) => {
  const {idProduct} = req.params;
  const body = req.body;
  const productUpdated = services.update(idProduct, body);
  if(typeof productUpdated === 'string'){
    return res.status(400).json({
      message: productUpdated
    })
  }
  res.status(200).json({
    message: 'updated put',
    data: productUpdated
  })
});

router.patch('/:idProduct', 
  validatorHandler(validateIdProduct, 'params'),
  validatorHandler(updatePatchProductSchema, 'body'),
  (req, res) => {
  const {idProduct} = req.params;
  const body = req.body;
  const productUpdated = services.updatePatch(idProduct, body);
  if(typeof productUpdated === 'string'){
    return res.status(400).send(productUpdated);
  }
  res.status(200).json({
    message: 'updated patch',
    data: productUpdated
  })
});

router.delete('/:idProduct', 
  validatorHandler(validateIdProduct, 'params'),
  (req, res) => {
  const {idProduct} = req.params;
  const productDeleted = services.delete(idProduct);
  if(typeof productDeleted === 'string'){
    return res.status(400).send(productDeleted);
  }
  res.status(200).json({
    message: 'Deleted',
    id: productDeleted
  })
});

module.exports = router;