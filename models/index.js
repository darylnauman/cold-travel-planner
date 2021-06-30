const User = require('./User')
const Destination = require('./Destination')
const Trip = require('./Trip')
const Comment = require('./Comment')

User.belongsToMany(Destination, {
    through: Trip,
    onDelete: "CASCADE"
})

//use the user id to get all the trips of a certain destination

User.hasMany(Trip, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
})

//use the user id to get all the trips of a user

// Trip.belongsTo(User, {
//     foreignKey: "trip_id",
//     onDelete: "CASCADE"
// })


Comment.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
})

//you are goin to get all the comments of a specific user 

Destination.hasMany(Comment,{
    foreignKey:"comment_id"
})

//you are going to get all the comments of a specific user of a certain location

// has Trip{
// foreignkeydestination
// foreignkeydestination
// }

// belongs Trip{
// destination
// }

// trip - has user, destination associated with it, total cost returned

module.exports = {User, Destination, Trip, Comment};