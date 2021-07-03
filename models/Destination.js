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