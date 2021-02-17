module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
        "Category",
        {
            //id: ?
            category: DataTypes.STRING(15),
        },
        { timestaps: false }
    );
};
Category.associate = function (models) {
    Catergory.hasMany(models.Product, {
        as: "products",
        foreignKey: "category_id",
    });
};
