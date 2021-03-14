module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            email: DataTypes.STRING(45),
            password: DataTypes.STRING(300),
            imagen: DataTypes.STRING(100),
            group_id: DataTypes.INTEGER,
        },
        { timestaps: false }
    );

    User.associate = function (models) {
        User.belongsTo(models.Group, {
            as: "group",
            foreignKey: "group_id",
        });
        User.belongsToMany(models.Product, {
            as: "products",
            through: "users_products_edited",
            foreignKey: "user_id",
            otherKey: "product_id",
            timestamps: false,
        });
    };
    return User;
};
