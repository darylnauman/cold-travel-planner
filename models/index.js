const User = require('./User')
const Destination = require('./Destination')
const Trip = require('./Trip')
const Comment = require('./Comment')

User.hasMany(Destination, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
})

Trip.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
})



module.exports = {User, Destination, Trip, Comment};