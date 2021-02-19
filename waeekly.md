Creemos que es bastante util, es la primera vez que lo implementamos, nos dio un buen pantallazo de como veniamos con el proyecto, los tiempos y si alguno le estaba costando alguna tarea y si esta podia atrazar de alguna forma el trabajo del otro. Estabamos haciendo algo muy similar con nuestro grupo de WhatsApp.

Weekly standups

-   Semana uno:
    .Nos juntamos por primera vez a mirar de que trataba el nuevo sprint
    .Se actualizo el tablero de trello con las nuevas tareas por hacer
    .Vimos un tutorial de Bootsrap para empezar a pasar el sitio a este framework
    .Se agrego la funcion borrar producto
    .Tratamos de hacer la modificacion de los productos, pero tuvimos problemas ya que cualquier campo nos quedaba como undefined.

-Semana dos:
.Se soluciono la modificacion de producto.
.Se subio la nueva rama de Bootstrap a Github.
.Se subio el JSON de usuarios.
.Terminamos de pasar el sitio a Bootstrap.
.Actualizacion de la Retro.

Sprint 5:

-   Semana uno:
    .Nos reunimos como siempre para leer el nuevo sprint y dividir tareas.
    .Armamos el tablero en Trello.
    .Se agrego el registro de usuarios, el modulo bcrypt y el metodo compareSync al loguearse
    .Se modificaron las rutas y los controllers del login y register, para que todo lo que tenga que ver con usuarios se maneje desde users.
    .Se agrego express validator

Semana dos:

.Se generaron los middleware del paso 8 y se acomodaron las rutas.
.Se nos complico con una variable que nos tiraba error, pero era que estaba solo declarada dentro del bloque del if.
.Terminamos de implementar el login de usuarios.
.Solucionamos el problema que tuvimos al intentar de imprimir el mail de usuario en la barra de navegacion de la vista, para que aparezca cuando estas logeado.
.Implementamos la funcion checkbox en el caso de que el usuario quiera ser recordado.
.Terminamos de armar la retro.
.Hicimos el ultimo commit para agregar la retro y la weekly.

Sequelize
Una Category tiene Muchos Prdoducts
Un Product tiene una Category

Un Disconunt tiene Muchos Prdoducts
Un Product tiene un Discount

Un Product tiene Muchas UserProductEdited
Un UserProductEdited tiene Muchos Productos
Un User tiene Muchos UserProductEdited
Un UserProductEdited tiene Muchos Users

Un User tiene un Group
Un Group tiene Muchos usuarios
