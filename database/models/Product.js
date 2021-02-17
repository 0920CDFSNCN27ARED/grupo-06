module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        "Product",
        {
            name: DataTypes.INTERGER,
            description: DataTypes.STRING(45),
            img: DataTypes.STRING(100),
            price: DataTypes.FLOAT,
            dicount_id: DataTypes.INTERGER,
            category_id: DataTypes.INTERGER,
        },
        { timestaps: false }
    );
};
Product.associate = function (models) {
    Product.belongsTo(models.Category, {
        as: "category",
        foreignKey: "catergory_id",
    });
    Product.belongsTo(models.Discount, {
        as: "discount",
        foreignKey: "discount_id",
    });
    Product.belongsToMany(models.UserProductEdited, {
        as: "ProductUser",
        through: models.UserProductEdited,
        foreignKey: "Products_id",
    });
};
