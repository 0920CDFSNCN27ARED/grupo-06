const fs = require("fs");
const path = require("path");

function getUsers() {
    const jsonDB = fs.readFileSync(
        path.resolve(__dirname, "../data/users.json"),
        {
            encoding: "utf-8",
        }
    );
    return JSON.parse(jsonDB);
}

module.exports = getUsers;
