Gestion de productos
Este proyecto es una aplicación web para la gestión de productos Permite a los usuarios visualizar una lista de productos, ver detalles de cada uno, editarlos, eliminarlos y agregar nuevos productos, usando las siguientes tecnologias

backend: node,js express y mongoose
autenticacion: json web token

instalacion

clonar repositorio
instalar dependencias
configurar variables de entorno
inciar servidor

Rutas principales

get ---->  /products -----> lista de todos los productos
get ---->  /products/:id -----> Obtener detalles de un producto po ID
post ----> /products -----> Agregar un producto nuevo
put ----> /products/:id -----> Editar un producto
delete ----> /products/:id -----> Eliminar un producto

Algunas rutas estan protegidas y requieren autenticacion de JWT, para poder acceder a ellas se debe obtener un token valido  y enviarlo al header  authorization

Autor
Gaston Bertuccio