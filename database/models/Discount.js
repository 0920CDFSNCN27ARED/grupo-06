module.exports = (sequelize, DataTypes) => {
    const Discount = sequelize.define(
        "Discount",
        {
            //id: ?
            discount: DataTypes.INTERGER,
        },
        { timestaps: false }
    );
};

Discount.associate = function (models) {
    Discount.hasMany(models.Product, {
        as: "produt",
        foreignKey: "discount_id",
    });
};
