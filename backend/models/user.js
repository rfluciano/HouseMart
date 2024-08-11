const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adresse: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    datenaissance: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    mot_de_passe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    tableName: 'users',
  });

  // Class methods
  User.createUser = async function(userData) {
    return User.create(userData);
  };

  User.getUserByEmail = async function(email) {
    return User.findOne({ where: { email } });
  };

  User.getAllUsers = async function() {
    return User.findAll();
  };

  User.getUserById = async function(userId) {
    return User.findByPk(userId);
  };

  User.updateUser = async function(userId, userData) {
    return User.update(userData, { where: { id: userId } });
  };

  User.deleteUser = async function(userId) {
    return User.destroy({ where: { id: userId } });
  };

  return User;
};
