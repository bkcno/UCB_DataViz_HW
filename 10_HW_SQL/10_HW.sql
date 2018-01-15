## SQL Homework
USE sakila;

-- 1a.
SELECT first_name, last_name
FROM actor; 

-- 1b.
SELECT
CONCAT (first_name, _utf8' ', last_name) as Actor_Name
FROM actor;

-- ------------------------------------------------------------------------------
-- 2a. 
SELECT actor_id 
FROM actor
WHERE first_name = 'Joe';

-- 2b.
SELECT first_name, last_name
FROM actor 
WHERE last_name LIKE '%GEN%';

-- 2c.
SELECT first_name, last_name
FROM actor
WHERE last_name LIKE '%LI%'
	ORDER BY last_name, first_name;

-- 2d.
SELECT country_id, country
FROM country
WHERE country IN ('Afghanistan', 'Bangladesh', 'China');

-- ----------------------------------------------------------------------------
-- 3a. 
ALTER TABLE actor
ADD COLUMN middle_name VARCHAR(15) AFTER first_name;

-- 3b. 
ALTER TABLE actor 
MODIFY COLUMN middle_name BLOB;

-- 3c.
ALTER TABLE actor 
DROP COLUMN middle_name;

-- --------------------------------------------
-- 4a. 
SELECT COUNT(last_name), last_name
FROM actor
GROUP BY last_name;

-- 4b. 
DROP VIEW IF EXISTS actor_lastname;
CREATE VIEW actor_lastname
AS
SELECT COUNT(last_name), last_name
FROM actor
GROUP BY last_name
HAVING COUNT(last_name) >= 2;

-- 4c. 
SELECT actor_id
FROM actor
WHERE first_name = 'Groucho' AND last_name = 'Williams';

UPDATE actor
SET first_name = 'HARPO' 
WHERE actor_id = 172;

-- 4d. 
UPDATE actor
SET first_name ="GROUCHO" 
WHERE actor_id = 172;
    
-- (To verify the result of query 4c/4d)
-- SELECT actor_id, first_name, last_name
-- FROM actor
-- WHERE last_name = 'Williams';

-- ------------------------------------------------------------------------------------
-- 5a. 
SHOW CREATE TABLE address; 
-- and then create table with all columns

-- 6a. 
SELECT first_name, last_name, address
FROM staff LEFT JOIN address on address.address_id = staff.address_id;

-- 6b. 
DROP VIEW IF EXISTS sales_by_staff;
CREATE VIEW sales_by_staff
AS
SELECT
CONCAT(s.first_name, _utf8' ', s.last_name) AS staff
, SUM(p.amount) AS total_sales
FROM payment AS p
INNER JOIN staff AS s ON p.staff_id = s.staff_id
WHERE DATE(p.payment_date) BETWEEN '2005-08-01' AND '2005-08-31'
GROUP BY s.staff_id;

-- 6c.
SELECT title,
	(
		SELECT COUNT(*)
			FROM film_actor
            WHERE film.film_id = film_actor.film_id
	) AS count
    FROM film;
    
-- (To verify #6c). 
-- SELECT COUNT(actor_id)
-- FROM film_actor
-- WHERE film_id IN
-- (
-- 	SELECT film_id 
--     FROM film
--     WHERE title = 'agent truman'
-- );

-- 6d.
SELECT COUNT(inventory_id)
FROM inventory
WHERE film_id IN

(
	SELECT film_id
		FROM film 
		WHERE title = 'hunchback impossible'
);

-- 6e.
DROP VIEW IF EXISTS payments_by_customer;
CREATE VIEW payments_by_customer
AS
SELECT
first_name, last_name AS customer
, SUM(p.amount) AS total_payment
FROM payment AS p
INNER JOIN customer AS c ON p.customer_id = c.customer_id
GROUP BY c.customer_id
ORDER BY c.last_name;

-- 7a.
SELECT title
FROM film
WHERE (title like 'K%') OR (title like 'Q%')
AND language_id IN
(
	SELECT language_id
	FROM language
    WHERE name = 'English'
);

-- 7b.
SELECT first_name, last_name
FROM actor
WHERE actor_id IN
(
	SELECT actor_id
    FROM film_actor
    WHERE film_id IN
    (
		SELECT film_id
        FROM film
        WHERE title = 'Alone Trip'
	)
);

-- 7c. 
SELECT customer.first_name, customer.last_name, customer.email, city.city, country.country
FROM customer
	JOIN address ON customer.address_id = address.address_id
    JOIN city ON address.city_id = city.city_id
    JOIN country ON city.country_id = country.country_id
    WHERE country = 'Canada';
    
-- (another method, not joins)
-- SELECT first_name, last_name, email
-- FROM customer
-- WHERE address_id IN
-- (
-- 		SELECT address_id
-- 		FROM address
--     WHERE city_id IN
--     ( 
-- 			SELECT city_id
--         FROM city
--         WHERE country_id IN
-- 		(	
-- 			SELECT country_id
-- 			FROM country
-- 			WHERE country = 'Canada')));

-- 7d.
SELECT title, description
FROM film
WHERE film_id IN
(	
	SELECT film_id
    FROM film_category
    WHERE category_id in
    (
		SELECT category_id
        FROM category
        WHERE name = 'family' 
)
);

-- 7e. 
SELECT f.title AS film
, COUNT(r.inventory_id) AS rental_count
FROM rental AS r
    INNER JOIN inventory AS i ON i.inventory_id = r.inventory_id
    INNER JOIN film AS f ON f.film_id = i.film_id
    GROUP BY f.title
	ORDER BY rental_count DESC;
        
-- 7f.
DROP VIEW IF EXISTS store_sales; 

CREATE VIEW store_sales
AS
SELECT
store_id AS store
, SUM(p.amount) AS total_sales
FROM payment AS p
INNER JOIN store AS s ON s.manager_staff_id = p.staff_id
GROUP BY s.store_id;

SELECT * FROM store_sales;

-- 7g.
SELECT store.store_id, city.city, country.country
FROM store
	JOIN address ON store.address_id = address.address_id
    JOIN city ON address.city_id = city.city_id
    JOIN country ON city.country_id = country.country_id;

-- 7h. 
SELECT c.name AS category
, SUM(p.amount) AS sum_of_sales
FROM payment AS p
	INNER JOIN rental AS r ON r.rental_id = p.rental_id
    INNER JOIN inventory AS i ON i.inventory_id = r.inventory_id
    INNER JOIN film AS f ON f.film_id = i.film_id
	INNER JOIN film_category AS fc ON fc.film_id = f.film_id
    INNER JOIN category AS c ON c.category_id = fc.category_id
    GROUP BY c.name
	ORDER BY sum_of_sales DESC
LIMIT 5;


-- -----------------------------------------------------------------------
-- 8a.
DROP VIEW IF EXISTS top_five_genres; 
CREATE VIEW top_five_genres
AS
SELECT c.name AS category
, SUM(p.amount) AS sum_of_sales
FROM payment AS p
	INNER JOIN rental AS r ON r.rental_id = p.rental_id
    INNER JOIN inventory AS i ON i.inventory_id = r.inventory_id
    INNER JOIN film AS f ON f.film_id = i.film_id
	INNER JOIN film_category AS fc ON fc.film_id = f.film_id
    INNER JOIN category AS c ON c.category_id = fc.category_id
    GROUP BY c.name
	ORDER BY sum_of_sales DESC
LIMIT 5;

-- 8b.
SELECT * FROM top_five_genres;

-- 8c. 
DROP VIEW top_five_genres;

-- ---------------------------------------------------------
-- ---------------------------------------------------------

