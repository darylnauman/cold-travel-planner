const User = require('./User')
const Destination = require('./Destination')
const Trip = require('./Trip')
const Comment = require('./Comment')

User.belongsToMany(Destination, {
    through: Trip,
    constraints: false
})

//use the user id to get all the trips of a certain destination

User.hasMany(Trip, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    constraints: false
})

Destination.hasMany(Trip, {
    foreignKey: "destination_id",
    constraints: false
})

Trip.belongsTo(Destination, {
    foreignKey: "destination_id",
    constraints: false
})

Destination.hasMany(Comment, {
    foreignKey:"destination_id",
    constraints: false
})

Comment.belongsTo(Destination, {
    foreignKey: "comment_id",
     constraints: false,
}),

Comment.belongsTo(User, {
    foreignKey: "comment_id",
    constraints: false
}),



module.exports = {User, Destination, Trip, Comment};