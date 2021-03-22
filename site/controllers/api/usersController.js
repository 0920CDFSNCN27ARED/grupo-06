const { User, Group, Sequelize, sequelize } = require("../../database/models");
const Op = Sequelize.Op;
const { QueryTypes } = Sequelize;

module.exports = {
    countUsers: async (req, res) => {
        const count = await User.count();
        const users = await User.findAll();
        res.send({
            count,
            users,
        });
    },

    find: (req, res) => {
        User.findByPk(req.params.id, {
            include: [{ association: "group" }],
        }).then(function (users) {
            res.send(users);
        });
    },
};
