window.addEventListener("load", function () {
    let formulario = document.querySelector("form.register-form");
    formulario.addEventListener("submit", function (evento) {
        let errores = [];

        let campoNombre = document.querySelector("input.name");

        if (campoNombre.value == "") {
            errores.push("El campo de nombre tiene que estar completo");
        } else if (campoNombre.value.length < 2) {
            errores.push(
                "El campo de nombre tiene que tener al menos 2 carácteres"
            );
        }

        let campoApellido = document.querySelector("input.lastname");

        if (campoApellido.value == "") {
            errores.push("El campo de Apellido tiene que estar completo");
        } else if (campoApellido.value.length < 2) {
            errores.push(
                "El campo de Apellido tiene que tener al menos 2 carácteres"
            );
        }

        let campoEmail = document.querySelector("input.emailform");

        if (campoEmail.value == "") {
            errores.push("El campo de Email tiene que estar completo");
        }

        let campoPassword = document.querySelector("input.passwordform");

        if (campoPassword.value == "") {
            errores.push("El campo de contraseña tiene que estar completo");
        } else if (campoPassword.value.length < 8) {
            errores.push(
                "El campo de contraseña tiene que tener al menos 8 carácteres"
            );
        }

        if (errores.length > 0) {
            evento.preventDefault();
            let ulErrores = document.querySelector("div.errores ul");
            for (let i = 0; i < errores.length; i++) {
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>";
            }
        }
    });
});
