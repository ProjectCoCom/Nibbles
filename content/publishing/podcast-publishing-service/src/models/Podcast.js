// Podcast model
module.exports = (sequelize, DataTypes) => {
  const Podcast = sequelize.define('Podcast', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    categories: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: []
    },
    language: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'en'
    },
    copyright: {
      type: DataTypes.STRING,
      allowNull: true
    },
    explicit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    timestamps: true,
    paranoid: true
  });

  Podcast.associate = (models) => {
    Podcast.hasMany(models.Episode, {
      foreignKey: 'podcastId',
      as: 'episodes'
    });
  };

  return Podcast;
};