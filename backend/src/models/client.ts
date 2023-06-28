'use strict';
import {
  Model
} from 'sequelize';

export interface ClientAttributes{
  document:string,
  firstName:string,
  lastName:string,
  email:string,
  address:string
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Client extends Model<ClientAttributes> implements ClientAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    document!:string; 
    firstName!: string;
    lastName!: string;
    email!: string;
    address!: string;
    static associate(models:any) {
      // define association here
    }
  }
  Client.init({
    document: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        notNull:{
          msg:"field can't be null"
        }
      }
    },
    firstName: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:true,
        notNull:{
          msg:"field can't be null"
        }
      }
    },
    lastName: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:true,
        notNull:{
          msg:"field can't be null"
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isEmail:true,
        notNull:{
          msg:"field can't be null"
        }
      }
    },
    address: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"field can't be null"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};