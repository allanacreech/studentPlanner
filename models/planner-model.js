module.exports = function(sequelize, DataTypes)
{
    var calendar = sequelize.define("calendar", {
      title: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      start: {
        type: DataTypes.STRING(48),
        allowNull: false
      },
      end: {
        type: DataTypes.STRING(48),
        allowNull: false
      },
      allDay: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      user_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      }
    }, {
      timestamps: false,
      //Even though the plural is the default I wanted to be explicit
      //as well as remember how to do it in the future
      freezeTableName: true,

        // define the table's name
      tableName: 'calendar',

      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // When we delete an Author, we'll also delete their Posts "cascade"
          // An Author (foreignKey) is required or a Post can't be made
          calendar.belongsTo(models.User,
            {
              onDelete: "cascade",
              foreignKey: 'user_id'
            });
        }
      }
    });

        return calendar;
};
