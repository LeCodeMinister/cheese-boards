const {sequelize, DataTypes } = require('./connection');

let Board = sequelize.define("Board", {
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    rating: DataTypes.INTEGER
})

module.exports = {
    Board
}