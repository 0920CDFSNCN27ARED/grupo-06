module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        "Product",
        {
            name: DataTypes.STRING(45),
            description: DataTypes.STRING(45),
            img: DataTypes.STRING(100),
            price: DataTypes.FLOAT,
            category_id: DataTypes.INTEGER,
        },
        { timestaps: false }
    );

    Product.associate = function (models) {
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "catergory_id",
        });
        Product.belongsToMany(models.User, {
            as: "Users",
            through: "users_products_edited",
            foreignKey: "product_id",
            otherKey: "user_id",
            timestamps: false,
        });
    };
    return Product;
};
