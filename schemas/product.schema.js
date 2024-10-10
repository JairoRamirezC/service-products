const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(20);
const price = Joi.number().integer();
const image = Joi.string().uri();
const isBlock = Joi.boolean();

const validateIdProduct = Joi.object({
  idProduct: id.required()
});

// const getProductByIdSchema = Joi.object({
//   idProduct: id.required()
// });

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  isBlock: isBlock.required()
});

const updateProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  isBlock: isBlock.required()
});

const updatePatchProductSchema = Joi.object({
  name,
  price,
  image,
  isBlock
});

module.exports = {validateIdProduct, createProductSchema, updateProductSchema, updatePatchProductSchema}