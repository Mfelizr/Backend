# Documentacion para API MongoDonals

El cliente nos pide la aplicación de auto-pedido para su hamburguesería Mongodonald's y nos pide los siguientes
requisitos:
Puedes usar el siguiente objeto para extraer la información de la que poblar tu base de datos:
En la página de inicio deberá haber 4 botones con los que damos al usuario la opción de pedir un menú, pedir
una hamburguesa, pedir una bebida o acabar el pedido. Al hacer click en cada uno de los botones, haz una
petición al servidor y muestra elementos select en los que el usuario puede seleccionar los productos que
quiere. Usa un método GET para ello.
Un menú viene con bebida y patatas. Por lo tanto si elige un menú preguntaremos qué bebida quiere y le
daremos la bebida que elija y patatas y la hamburguesa correspondiente del menú. Si elige una hamburguesa le
daremos opción a añadir patatas. Si elige una bebida le daremos la opción de elegir cuál quiere de entre todas
las opciones.
Al seleccionar una de las opciones (menú, hamburguesa o bebida), tendremos un botón que enviará al servidor
la información seleccionada (menú+bebida, hamburguesa+patatas o bebida) por el usuario. Haz que esta
información se envíe usando el método POST
Cuando el usuario elija terminar el pedido le pediremos que lo confirme y le daremos la posibilidad de editar el
pedido. Si el usuario elige cambiarlo, muestra las opciones seleccionadas. Usa una petición PUT para modificar
el pedido. Si el usuario elige no cambiar el pedido, o después de haberlo modificado, le presentaremos el pedido
completo y el precio total.
