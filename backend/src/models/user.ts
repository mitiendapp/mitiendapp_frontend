'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface UserAttributes{
  id:string,
  firstName:string,
  lastName:string,
  email:string,
  password:string,
  roles:object,
  status:string
}

module.exports = (sequelize:any, DataTypes:any) => {
  class User extends Model<UserAttributes> implements UserAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!:string;
    firstName!: string;
    lastName!:string;
    email!: string;
    password!: string;
    roles!: object;
    status!: string;

    static associate(models:any) {
      // define association here
    }
  }
  User.init({
    id:{
      type:DataTypes.UUID,
      defaultValue:UUIDV4,
      primaryKey:true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull:true,
      validate:{
        notEmpty:{
          msg:"Field can't be empty"
        },
      }
    },
    lastName:{
      type:DataTypes.STRING,
      allowNull:true,
      validate:{
        notEmpty:{
          msg: "Field can't be empty"
        },
      },

    },
    email: {
      type: DataTypes.STRING, 
      allowNull:false,
      unique:true,
      validate:{ 
        isEmail:true,
        notNull:{
          msg:"Field can't be null"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"Field can't be null"
        }
      }
    },
    roles: {
      type: DataTypes.JSON,
      defaultValue:{
        "client":2900
      },
      allowNull:true
    },
    status: {
      type: DataTypes.STRING,
      defaultValue:"active"
    }
  }, {
    sequelize, 
    modelName: 'User',
  });
  return User;
};
