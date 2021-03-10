window.addEventListener("load", function () {
    let formulario = document.querySelector("form.products-form");
    formulario.addEventListener("submit", function (evento) {
        let errores = [];

        let campoNombre = document.querySelector("input.nameform");

        if (campoNombre.value == "") {
            errores.push("El campo de nombre tiene que estar completo");
        } else if (campoNombre.value.length < 5) {
            errores.push(
                "El campo de nombre tiene que tener al menos 5 carácteres"
            );
        }

        let campoDescripcion = document.querySelector("input.descriptionform");

        if (campoDescripcion.value == "") {
            errores.push("El campo de Descripcion tiene que estar completo");
        } else if (campoDescripcion.value.length < 5) {
            errores.push(
                "El campo de Descripcion tiene que tener al menos 5 carácteres"
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
