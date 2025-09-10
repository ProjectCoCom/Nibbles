// Episode model
module.exports = (sequelize, DataTypes) => {
  const Episode = sequelize.define('Episode', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    podcastId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Podcasts',
        key: 'id'
      }
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
    audioFileUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: true,
        min: 0
      }
    },
    publishDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('draft', 'scheduled', 'published', 'failed'),
      allowNull: false,
      defaultValue: 'draft'
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: []
    }
  }, {
    timestamps: true,
    paranoid: true
  });

  Episode.associate = (models) => {
    Episode.belongsTo(models.Podcast, {
      foreignKey: 'podcastId',
      as: 'podcast'
    });
  };

  return Episode;
};