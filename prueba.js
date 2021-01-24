let bcrypt = require("bcrypt");

let password = "1234";

let resultado = bcrypt.hashSync(password, 10);

console.log(password);
console.log(resultado);
