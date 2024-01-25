-- 1. Encuentra todos los personajes "buenos".
	SELECT * FROM marvel WHERE align LIKE 'good characters'
-- 2. Muestra los personajes con ojos y pelo marrones.
	SELECT * FROM marvel WHERE eye LIKE '%brown%' AND hair LIKE '%brown%'
-- 3. Encuentra los personajes varones que estén vivos
	SELECT * FROM marvel WHERE sex LIKE 'male%' AND alive LIKE '%living%'
-- 4. Muestra los personajes que tienen una 'Public Identity' y han aparecido más de 100 veces
	SELECT * FROM marvel WHERE id LIKE 'public%' and appearances > 100
-- 5. Encuentra los personajes cuya primera aparición fue en los años 60
	SELECT * FROM marvel WHERE YEAR BETWEEN 1960 AND 1969
-- 6. Muestra los personajes que no son neutrales.
	SELECT * FROM marvel WHERE align NOT LIKE 'neutral%'
-- 7. Encuentra los personajes que no tienen información sobre su orientación sexual.
	SELECT * FROM marvel WHERE gsm like ''
-- 8. Muestra los personajes vivos que hayan aparecido 50 veces o menos.
	SELECT * FROM marvel WHERE alive LIKE 'living%' AND appearances <= 50

-- 9. Encuentra los personajes cuyos ojos no son azules ni marrones.
	SELECT * FROM marvel WHERE eye NOT IN ('Blue Eyes','Brown Eyes')
-- 10. Muestra los personajes que han aparecido más de 50 y menos de 100 veces.
	SELECT * FROM marvel WHERE appearances BETWEEN 51 AND 99
-- 11. Encuentra los personajes femeninos muertos.
	SELECT * FROM marvel WHERE sex LIKE 'female%' and alive LIKE 'deceased%'
-- 12. Muestra los personajes que han aparecido después del 2000.
	SELECT * FROM marvel WHERE YEAR > 2000