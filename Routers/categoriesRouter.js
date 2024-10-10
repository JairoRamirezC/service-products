const express = require('express');

const router = express.Router();

router.get('/:idCategory/products/:idProduct', (req, res) => {
  const {idCategory, idProduct} = req.params;
  const {limit, offset} = req.query;
  res.json({
    id: idProduct,
    idCategory,
    name: 'Product 1',
    price: 4500,
    limit: limit ? limit : null,
    offset: offset ? offset : null
  })
});

module.exports = router;