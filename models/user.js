// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
 username: {
 type: DataTypes.STRING,
 allowNull: false,
 unique: true
 },
 password: {
 type: DataTypes.STRING,
 allowNull: false
},
role: {
type: DataTypes.ENUM('admin', 'user'),
allowNull: false
},
profilePic: {
    type: DataTypes.STRING
}
}, {
hooks: {
beforeCreate: async (user) => {
const salt = await bcrypt.genSalt(10);
user.password = await bcrypt.hash(user.password, salt);
}
}
});
module.exports = User;
