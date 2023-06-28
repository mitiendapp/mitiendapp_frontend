'use strict';

import { ProductsAttributes } from "./product";

const {
  Model
} = require('sequelize');

interface shoppingCartAttributes{
  products: object
}

module.exports = (sequelize:any, DataTypes:any) => {
  class shoppingCart extends Model implements shoppingCartAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    products!: ProductsAttributes[];
    static associate(models:any) {
      // define association here
    }
  }
  shoppingCart.init({
    products: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'shoppingCart',
  });
  return shoppingCart;
};