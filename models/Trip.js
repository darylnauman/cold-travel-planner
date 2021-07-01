const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Trip extends Model {

}

Trip.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        end_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        trip_budget:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        hotel_cost:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: true
        },
        food_cost:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: true
        },
        ent_cost:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: true
        },
        misc_cost:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: true
        },
        transport_cost:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: true
        },
         user_id:{
            type: DataTypes.INTEGER,
            references:{
                model: "user",
                key: "id"
            }
           },
           destination_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'destination',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'trip',
    }
);

module.exports = Trip;