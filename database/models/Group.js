module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define(
        "Group",
        {
            //id: ?
            group: DataTypes.STRING(45),
        },
        { timestaps: false }
    );
};
Group.associate = function (models) {
    Group.hasMany(models.User, {
        as: "user",
        foreignKey: "group_id",
    });
};
