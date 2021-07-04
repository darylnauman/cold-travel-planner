const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Destination extends Model {

}
Destination.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        location_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

       //destination doesnt need the comments references, theres no way
       //to make an array of comments in here in SQL
        comment_id: {
            type: DataTypes.INTEGER,
 },
},

    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'destination',
    }

);

module.exports = Destination;