// Anchor.fm publishing job model
module.exports = (sequelize, DataTypes) => {
  const AnchorPublishingJob = sequelize.define('AnchorPublishingJob', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    publishingJobId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'PublishingJobs',
        key: 'id'
      }
    },
    anchorEpisodeId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'uploading', 'processing', 'published', 'failed'),
      allowNull: false,
      defaultValue: 'pending'
    },
    progress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100
      }
    },
    errorMessage: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: true,
    paranoid: true
  });

  AnchorPublishingJob.associate = (models) => {
    AnchorPublishingJob.belongsTo(models.AnchorAuth, {
      foreignKey: 'anchorAuthId',
      as: 'anchorAuth'
    });
  };

  return AnchorPublishingJob;
};