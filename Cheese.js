const {sequelize, DataTypes } = require('./connection');

let Cheese = sequelize.define("Cheese", {
    title: DataTypes.STRING,
    description: DataTypes.STRING
})

module.exports = {
    Cheese
}