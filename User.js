const {sequelize, DataTypes } = require('./connection');

let User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING
})

module.exports = {
    User
}