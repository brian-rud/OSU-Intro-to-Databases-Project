-- Define recipes table
DROP TABLE IF EXISTS recipes;

CREATE TABLE recipes (
	recipe_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	description VARCHAR(255) NOT NULL,
	cuisine VARCHAR(255) NOT NULL,
	diet VARCHAR(255) NOT NULL,
	meal VARCHAR(255) NOT NULL,
	serving_amount INT NOT NULL
);

-- Define ingredients table
DROP TABLE IF EXISTS ingredients;

CREATE TABLE ingredients(
	ingredient_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	name VARCHAR(255) NOT NULL
);

-- Define cuisines table
DROP TABLE IF EXISTS cuisines;

CREATE TABLE cuisines(
	cuisine_id INT PRIMARY KEY AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) UNIQUE NOT NULL
);

-- Define diets table
DROP TABLE IF EXISTS diets;

CREATE TABLE diets(
	diet_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	name VARCHAR(255) UNIQUE NOT NULL
);
