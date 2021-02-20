module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define(
        "Group",
        {
            group: DataTypes.STRING(45),
        },
        { timestamps: false }
    );

    Group.associate = function (models) {
        Group.hasMany(models.User, {
            as: "user",
            foreignKey: "group_id",
        });
    };
    return Group;
};
