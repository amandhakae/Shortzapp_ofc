const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const User = require("../user/userModel"); // Importa o modelo User para fazer associação

const Video = sequelize.define(
  'Video', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  videoPath: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  thumbnailPath: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User, // Referencia o modelo User
      key: "id",
    },
    allowNull: false,
  },
}, {
  tableName: "videos", // Nome da tabela no banco de dados
  timestamps: true, // Adiciona createdAt e updatedAt automaticamente
});

// Define as associações
User.hasMany(Video, { foreignKey: "userId" }); // Um usuário pode ter muitos vídeos
Video.belongsTo(User, { foreignKey: "userId" }); // Um vídeo pertence a um usuário

module.exports = Video;