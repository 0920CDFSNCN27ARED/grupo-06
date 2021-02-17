module.exports = (sequelize, DataTypes) => {
    const UserProduct = sequelize.define(
        "UserProductEdited",
        {
            products_id: DataTypes.INTERGER,
            users_id: DataTypes.INTERGER,
        },
        { timestaps: false }
    );
};
UserProductEdited.associate = function (models) {
    UserProductEdited.belongsToMany(models.UserProductEdited, {
        as: "UserProduct",
        through: models.UserProductEdited,
        foreignKey: "users_id",
    });
    UserProductEdited.belongsToMany(models.UserProductEdited, {
        as: "ProductUser",
        through: models.UserProductEdited,
        foreignKey: "products_id",
    });
};
