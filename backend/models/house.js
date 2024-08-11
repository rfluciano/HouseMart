const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const House = sequelize.define("House", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    IdVendeur: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lieux: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quartier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prix: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    categorie: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    timestamps: true,
    tableName: 'houses',
  });

  House.associate = (models) => {
    // Define associations here
    House.belongsTo(models.User, {
      foreignKey: 'IdVendeur',
      as: 'owner',
    });
  };

  return House;
};
