const {faker} = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');
const boom = require('@hapi/boom');

class ProductServices {

  constructor(limitValue = 10, offsetValue = null) {
    this.products = [];
    this.errorLimit = false;
    this.limit = limitValue;
    this.offset = offsetValue;
    // this.buildData(limitValue, offsetValue);
  }

  // buildData(limit, offset){
  buildData(){
    const {limit, offset} = this;
    if(isNaN(limit)){
      this.errorLimit = true;
      return;
    }
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: uuidv4(),
        name: faker.commerce.productName(),
        price: faker.commerce.price() * 1,
        image: faker.image.url(),
        offset: offset ? offset : null,
        isBlock: faker.datatype.boolean()
      })
    }
  }

  find(){
    if(this.errorLimit) throw boom.conflict('The limit value must be a positive number');
    return this.products;
  }

  findProductById = (id) => {
    const dataFinded = this.products?.find(item => item.id === id);
    if(!dataFinded){
      throw boom.notFound('Product Not Found');
      // throw new Error('Product Not Found');
      // return 'Product Not Found';
    }
    if(dataFinded.isBlock) throw boom.conflict('Product is Block');
    return dataFinded;
  }

  create(newData){
    const {name, price, image, isBlock} = newData;
    // Ya no se validan los datos desde aca, ya que este trabajo lo hacen los schemas (product.schema.js)
    // if(!name) throw boom.notFound('property name required');
    // if(!price) return 'property price required';
    // if(!image) return 'property image required';
    const newProduct = {
      id: uuidv4(),
      name,
      price,
      image,
      offset: this.offset ? this.offset : null,
      isBlock
    }
    this.products.push(newProduct);
    return newProduct;
  }

  update(id, product){
    // const {name, price, image} = product;
    // if(!name) throw boom.require('property name required');
    // if(!price) throw boom.require('property price required');
    // if(!image) throw boom.require('property image required');
    const positionProduct = this.products?.findIndex(item => item.id === id);
    // if(positionProduct === -1) return 'product not found';
    if(positionProduct === -1) throw boom.notFound('product not found');
    this.products[positionProduct] = {
      id,
      ...product,
      offset: this.offset ? this.offset : null
    };
    return this.products[positionProduct];
  }

  updatePatch(id, product) {
    const positionProduct = this.products.findIndex(item => item.id === id);
    if(positionProduct === -1) return 'product not found';
    const lastInfoInProduct = this.products[positionProduct];
    this.products[positionProduct] = {
      ...lastInfoInProduct,
      ...product
    }
    return this.products[positionProduct];
  }

  delete(id){
    const isIdIntoProduct = this.products.findIndex(item => item.id === id); //* Devuelve el indice del objeto donde se encuentra el id, si no existe devuelve -1
    // if(isIdIntoProduct === -1) return 'Id does not exist';
    if(isIdIntoProduct === -1) throw boom.notFound('Id does not exist');
    // this.products.splice(isIdIntoProduct, 1); //* Otra forma de eliminar items en el array
    this.products = this.products.filter(item => item.id !== id);
    return {id};
  }
}

module.exports = ProductServices;