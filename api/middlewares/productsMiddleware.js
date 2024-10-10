import { check } from 'express-validator';

class ProductsMiddleware {

  static urlValidateFields = [
    check(id).notEmpty().withMessage('El id del producto es requerido')
  ]
}

module.exports = ProductsMiddleware;