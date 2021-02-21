module.exports = (sequelize, DataTypes) => {
    const alias = "Category";
    const cols = {
        category: {
            type: DataTypes.STRING(15),
        },
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    };
    const config = {
        tableName: "Categorys",
        timestamps: false,
    };

    let Category = sequelize.define(alias, cols, config);

    Category.associate = function (models) {
        Category.hasMany(models.Product, {
            as: "products",
            foreignKey: "category_id",
        });
    };

    return Category;
};
