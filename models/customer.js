const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Customer = sequelize.define('Customer', {
 customerID: {
 type: DataTypes.INTEGER,
 primaryKey: true,
 autoIncrement: true
 },
 customerName: {
 type: DataTypes.STRING,
 allowNull: false
 },
 contactName: {
 type: DataTypes.STRING,
 allowNull: false
 },
 address: {
 type: DataTypes.STRING,
 allowNull: false
 },
 city: {
 type: DataTypes.STRING,
 allowNull: false
 },
 postalCode: {
 type: DataTypes.STRING,
 allowNull: false
 },
 country: {
 type: DataTypes.STRING,
 allowNull: false
}
});
module.exports = Customer;
