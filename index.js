const {User} = require('./User');
const {Board} = require('./Board');
const {Cheese} = require('./Cheese');

//One-to-Many Relationship between User & Board
User.hasMany(Board);
Board.belongsTo(User);

//Many-to-Many Relationship between Board & Cheese
Board.belongsToMany(Cheese, {through: "board_cheese_junctions"});
Cheese.belongsToMany(Board, {through: "board_cheese_junctions"});

module.exports = { User, Board, Cheese }