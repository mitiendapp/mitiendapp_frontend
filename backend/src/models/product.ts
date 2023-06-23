'use strict';
const {
  Model
} = require('sequelize');

interface ProductsAttributes{
  name:string,
  description:string,
  price:string,
  image:string,
  stock:number,
  state:string,
}

module.exports = (sequelize:any, DataTypes:any) => {
  class product extends Model implements ProductsAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    name!:string;
    description!: string;
    price!: string;
    image!: string;
    stock!: number;
    state!: string;

    static associate(models:any) {
      // define association here
    }
  }
  product.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:true,
        notNull:{
          msg:"field can't null"
        }
      }
    },
    description: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"field can't null"
        }
      }
    },
    price: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"field can't null"
        }
      }
    },
    image: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"field can't null"
        }
      }
    },
    stock: {
      type:DataTypes.BIGINT,
      allowNull:false,
      validate:{
        notNull:{
          msg:"field can't null"
        }
      }
    },
    state: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"field can't null"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};