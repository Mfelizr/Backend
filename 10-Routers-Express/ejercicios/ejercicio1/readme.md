# Documentación API Hotel

## Diseño de la BBDD:
Colección Clientes:
Nombre
Apellido
DNI

Colección Habitaciones (Aquí tendréis que introducir 8 habitaciones)
Nº habitación
Estado

Colección reservas
Cliente
Habitación
Fecha Check In
Fecha CheckOut

## Endpoints:

1. Registrar cliente: Aquí registramos un nuevo cliente, puesto que no se puede reservar una habitación si previamente no se ha registrado al cliente. Recibiremos los datos de nombre, apellido y DNI y añadiremos los datos a la colección de Clientes.
2. Editar cliente: Tendremos la opción de cambiar el nombre y el apellido de un cliente que ya está registrado en la BBDD.
3. Check-in: Aquí enviaremos el DNI del cliente que quiere hacer la reserva y la habitación en la que quiere hospedarse.
    - Si el cliente no existe devolverá un mensaje que nos indique que el cliente no está registrado y por lo tanto no puede hacer una reserva.
    - Si la habitación no está disponible, devolverá un mensaje de que la habitación no está disponible y por lo tanto no puede hacer la reserva.
    - Si todo está correcto, añadiremos a la colección RESERVAS tanto el cliente como la habitación reservada y pondremos la habitación en la colección HABITACIONES con su estado a ocupado.
4. Checkout: Crea una ruta que reciba el DNI del cliente. Si el DNI es correcto, se cambiará la reserva para indicar la fecha fin de la reserva y la habitación pasará a estado libre.
