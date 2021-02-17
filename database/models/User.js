module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            email: DataTypes.STRING(45),
            password: DataTypes.STRING(300),
            image: DataTypes.STRING(100),
            group_id: DataTypes.INTERGER,
        },
        { timestaps: false }
    );
};
User.associate = function (models) {
    User.belongsTo(models.Group, {
        as: "group",
        foreignKey: "group_id",
    });
    Users.belongsToMany(models.UserProductEdited, {
        as: "UserProduct",
        through: models.UserProductEdited,
        foreignKey: "users_id",
    });
};
