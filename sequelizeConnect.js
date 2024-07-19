const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("SequelizeDB2", "root", "mysql", {
  host: "localhost",
  dialect: "mysql",
});

const User = sequelize.define("User", {
  fname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

sequelize
  .sync()
  .then(() => console.log("DB and tables created"))
  .catch((err) => console.log("Error while creating", err));

module.exports = { sequelize, User };
