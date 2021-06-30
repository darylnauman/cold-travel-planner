const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Comment extends Model {

}
Comment.init(
    {
       id:{
           type:DataTypes.INTEGER,
           allowNull: false,
           autoIncrement:true,
           primaryKey: true
       },
       content:{
           type: DataTypes.STRING,
           allowNull: false,
           defaultValue: ''
           
       },
     
      
    
       },
       {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
      }    
);


module.exports = Comment;