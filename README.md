# APLICACION TRAPEZEAERIAL
Esta aplicacion te permite explorar el mundo circense, especificamente las diversas figuras del "Trapecio aereo fijo", ademas de ofrecer distintas funciones para los usuarios.

Esta API esta utilizando dependecias como Node.js, jsonfile, Morgan y Express. Se ha puesto un fuerte énfasis en la seguridad, incluyendo métodos avanzados para proteger las contraseñas de los usuarios. Además, se han utilizado herramientas para validar los datos y generar identificadores únicos. En resumen, esta API representa un trabajo sólido y confiable, diseñado para cumplir con los más altos estándares de calidad en el desarrollo de software.

## INFORMACION SOBRE LAS FUNCIONES DISPONIBLES

A continuación, se detalla cuales son las funciones que el usuario puede acceder sin necesidad de iniciar sesion y cuales estan autorizadas solamente para los usuarios registrados:

- **Para realizar estas funciones el usuarios no necesita iniciar sesion**
1. Registrarse en la api
2. Iniciar sesion en su cuenta, si esta registrada anteriormente

- **Para realizar estas funciones el usuarios necesita iniciar sesion**
1. Obtencion de toda la lista de usuarios.
2. Obtener usuarios por id. 
3. Realiza una actualizacion en la lista de usuarios, especificamente en el usuario que sepa el nombre.
4. Para cerrar sesion de su cuenta.
5. Para eliminar un usuario.

A continuación, se detalla cuales son las funciones que el usuario disfruta, por estar registrado e inicializar sesion, sobre las figuras de trapecio que ofrece el programa:

- **Para disfrutar de estas funciones sobre la api TrapezeAerial el usuarios necesita iniciar sesion**
1. Obtener todas las figuras de trapecio existentes en la base de datos.
2. Obtener las figuras de trapecio por su nivel de dificultad.
3. Obtener la historia general del trapecio.
4. Obtener las figuras de trapecio por su id.
5. Obtener la url de las imagenes por id que demuestran la figura finalizada.
6. Obtener la guia por el nombre del truco deseado que detalla paso a paso como realizar la figura correctamente.
7. Crear una figura para compartir el conocimiento con los demas usuarios .
8. Actualizar una figura por su respectivo id.
9. Borrar una figura por su respectivo id.

### ENDPOINT DEL ARCHIVO `API.HTTP`

Se detalla todas las diversas opciones o endpoint que el programa puede realizar y fueron usados de prueba para el funcionamiento del programa:

```

                                      --------------- API GENERAL INFORMATION --------------- 

- Mostrar la informacion de la api
GET http://localhost:1904/api 

                                             --------------- USERS ---------------

- Mostrar todos los usuarios
GET http://localhost:1904/api/users
Authorization: c5eafaff-ed78-43f0-9fb8-d6e991d7db7f

- Buscar por id
GET http://localhost:1904/api/users/98350e5e-3581-427b-9b05-ad006e990752
Authorization: c5eafaff-ed78-43f0-9fb8-d6e991d7db7f

- Registrar un usuario
POST http://localhost:1904/api/users/register
Content-Type: application/json

{
  "username": "Carolina Sordini",
  "password": "12345",
  "email": "carito4@gmail.com",
  "phoneNumber": 3489334895
}

- Logearse
POST http://localhost:1904/api/users/login
Content-Type: application/json

{
  "username": "tatiana aylen vega",
  "password": "29072022"
}

- Actualizar usuarios
PATCH http://localhost:1904/api/users/carolina SORDIni
Authorization: c5eafaff-ed78-43f0-9fb8-d6e991d7db7f
Content-Type: application/json

{
  "email": "pepinito10@gmail.com",
  "phoneNumber": 9876543210
}

- Desloguearse
DELETE http://localhost:1904/api/users/logout
Authorization: c5eafaff-ed78-43f0-9fb8-d6e991d7db7f
Content-Type: application/json

{
  "username": "tatiana aylen vega"
}


- Borrar usuario de la base de datos
DELETE http://localhost:1904/api/users/carolina SORDIni
Authorization: c5eafaff-ed78-43f0-9fb8-d6e991d7db7f

                                      --------------- TRAPEZOID API FUNCTIONS ------------

- Mostrar todas las figuras
GET http://localhost:1904/api/trapeze
Authorization: c5eafaff-ed78-43f0-9fb8-d6e991d7db7f

- Mostrar las figuras por su dificultad (queryparams)
GET http://localhost:1904/api/trapeze?difficulty=high
Authorization: c5eafaff-ed78-43f0-9fb8-d6e991d7db7f

- Mostrar la historia general del trapecio
GET http://localhost:1904/api/trapeze/history
Authorization: c5eafaff-ed78-43f0-9fb8-d6e991d7db7f

- Buscar las figuras por id
GET http://localhost:1904/api/trapeze/605e9b99-b341-4cf9-bbb5-39a1e7b8b362
Authorization: c5eafaff-ed78-43f0-9fb8-d6e991d7db7f

- Buscar imagenes por id
GET http://localhost:1904/api/trapeze/image/605e9b99-b341-4cf9-bbb5-39a1e7b8b362
Authorization: c5eafaff-ed78-43f0-9fb8-d6e991d7db7f

- Buscar la guia para realizar una figura
GET http://localhost:1904/api/trapeze/steps/Squad
Authorization: c5eafaff-ed78-43f0-9fb8-d6e991d7db7f


- Crear figuras
POST http://localhost:1904/api/trapeze/create
Authorization: c5eafaff-ed78-43f0-9fb8-d6e991d7db7f
Content-Type: application/json

{
  "name": "Split",
  "description": "The Split figure consists of opening your legs in opposite directions while you are suspended in the air with the help of the trapeze. The trapeze artist performs a series of movements to gain momentum and height before releasing from the trapeze and extending the legs to the sides in a split position. The position is held for a set amount of time, demonstrating control and flexibility, before grabbing the trapeze again to safely complete the figure.",
  "steps": [
    "The aerialist swings back and forth to gain momentum and height.",
    "At the right moment, the trapeze artist releases the trapeze and launches himself into the air.",
    "While in the air, the trapeze artist extends his legs to the sides in a split position",
    "The split position is held for a few seconds, showing control and flexibility.",
    "Finally, the trapeze artist grabs the trapeze with his hands again to safely complete the figure."
  ],
  "difficulty": "High",
  "images": "https://i.ytimg.com/vi/KlxqkXq-OU4/maxresdefault.jpg"
}

- Actualizar la informacion de una figura
PATCH http://localhost:1904/api/trapeze/605e9b99-b341-4cf9-bbb5-39a1e7b8b362
Authorization: c5eafaff-ed78-43f0-9fb8-d6e991d7db7f
Content-Type: application/json

{
  "name": "Squad",
  "difficulty": "High"
}

- Eliminar una figura por id
DELETE http://localhost:1904/api/trapeze/605e9b99-b341-4cf9-bbb5-39a1e7b8b362
Authorization: c5eafaff-ed78-43f0-9fb8-d6e991d7db7f

```

#### ERD PARA EL FLUJO DE FUNCIONAMIENTO DE LA API:

[![ERD-programacion-1.png](https://i.postimg.cc/KvTgTSr2/ERD-programacion-1.png)](https://postimg.cc/ZCTRkQM7)


¡Gracias por utilizar la aplicación "TRAPEZEAERIAL"!