-- 1. Selecciona todos los registros de la tabla.
	SELECT * FROM pokemon
-- 2. Selecciona los nombres y tipos de todos los Pokémon.
	SELECT NAME, TYPE1, TYPE2  FROM pokemon
-- 3. Encuentra los Pokémon que son de tipo "Fire".
	SELECT * FROM pokemon WHERE TYPE1 LIKE 'fire' OR TYPE2 LIKE 'fire'
-- 4. Encuentra los Pokémon cuya velocidad ( Speed ) sea mayor a 90.
	SELECT * FROM pokemon WHERE speed > 90
-- 5. Ordena los Pokémon por puntos totales ( Total ) de forma descendente.
	SELECT * FROM pokemon order by total desc
-- 6. Encuentra los Pokémon legendarios.
	SELECT * FROM pokemon WHERE legendary like 'true'
-- 7. Muestra los nombres y tipos de Pokémon de la segunda generación.
	SELECT NAME, TYPE1, TYPE2 FROM pokemon WHERE generation = 2
-- 8. Encuentra los Pokémon que tienen una defensa ( Defense ) mayor a 70 y son de tipo "Grass".
	SELECT * FROM pokemon WHERE defense > 70 AND (TYPE1 like 'grass' OR TYPE2 like 'grass')
-- 9. Encuentra los Pokémon que tienen un ataque ( Attack ) entre 50 y 70.
	SELECT * FROM pokemon WHERE attack BETWEEN 50 AND 70
-- 10. Cuenta cuántos Pokémon hay en total. -- Hay 800 pokemons
	SELECT COUNT(*) cantidad_pokemons FROM pokemon 
-- 11. Calcula el promedio de puntos totales ( Total ) de todos los Pokémon.
	SELECT AVG(total) total_promedio FROM pokemon
-- 12. Encuentra los Pokémon de tipo "Water" con puntos totales ( Total ) superiores a 400.
	SELECT * FROM pokemon WHERE (TYPE1 like 'water' OR TYPE2 like 'water') and total > 400
-- 13. Muestra los nombres y tipos de los Pokémon cuyo nombre comienza con la letra 'C'.
	SELECT NAME, TYPE1, TYPE2 FROM pokemon WHERE name LIKE 'c%'
-- 14. Encuentra los Pokémon de la tercera generación que no son legendarios.
	SELECT NAME, TYPE1, TYPE2, generation, legendary FROM pokemon WHERE generation = 3 AND legendary = 'false'
-- 15. Encuentra los Pokémon cuyo nombre contiene la palabra "Mega".
	SELECT * FROM pokemon WHERE name LIKE '%mega%'