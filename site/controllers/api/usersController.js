const { User, Group, Sequelize, sequelize } = require("../../database/models");
const Op = Sequelize.Op;
const { QueryTypes } = Sequelize;

module.exports = {
    countUsers: async (req, res) => {
        const count = await User.count();
        let users = await User.findAll();
        for (let i = 0; i < users.length; i++) {
            delete users[i].email;            
        };
        console.log(users[1].email)
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
