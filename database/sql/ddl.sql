-- Define users table
DROP TABLE IF EXISTS users;

CREATE TABLE users (
	email VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL
);

-- Insert sample users
INSERT INTO users VALUES
	("mscott@dundermifflin.com", "Michael", "Scott", "worldsbestboss"),
	("jhalpert@dundermifflin.com", "Jim", "Halpert", "whichbearisbest"),
	("dschrute@dundermifflin.com", "Dwight", "Schrute", "schrutefarms");

-- Define recipes table
DROP TABLE IF EXISTS recipes;

CREATE TABLE recipes (
	recipe_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	user_id VARCHAR(255) NOT NULL REFERENCES users(email),
	recipe_url VARCHAR(255) NOT NULL,
	name VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL,
	meal VARCHAR(255) NOT NULL,
	serving_amount INT NOT NULL
);

-- Insert sample recipes
INSERT INTO recipes VALUES
	(0, "dschrute@dundermifflin.com", "https://www.schrutefarmsrecipes.com", "Beet Casserole", "Baked beetroot casserole", "Dinner", 6),
	(0, "jhalpert@dundermifflin.com", "https://www.phillyinquirer.com", "Lasagna", "Beef lasagna with tomato sauce", "Lunch", 8),
	(0, "mscott@dundermifflin.com", "https://www.foodnetwork.com", "Chicken Pot Pie", "Chicken pie with flaky crust", "Lunch", 1);

-- Define ingredients table
DROP TABLE IF EXISTS ingredients;

CREATE TABLE ingredients(
	ingredient_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	name VARCHAR(255) NOT NULL
);

-- Insert sample ingredients
INSERT INTO ingredients VALUES
	(0, "chicken breast"),
	(0, "beetroot"),
	(0, "tomato sauce"),
	(0, "mozzarella cheese"),
	(0, "lasagna noodles"),
	(0, "ground beef"),
	(0, "pie crust"),
	(0, "heavy cream"),
	(0, "frozen peas"),
	(0, "frozen carrots");


-- Define recipe_ingredients table
DROP TABLE IF EXISTS recipe_ingredients;

CREATE TABLE recipe_ingredients(
	recipe_id INT NOT NULL REFERENCES recipes(recipe_id),
	ingredient_id INT NOT NULL REFERENCES ingredients(ingredient_id),
	quantity DECIMAL NOT NULL,
	unit VARCHAR(255) NOT NULL,
	PRIMARY KEY (recipe_id, ingredient_id)
);

INSERT INTO recipe_ingredients VALUES 
	((SELECT recipe_id FROM recipes WHERE recipes.name = "Beet Casserole"), (SELECT ingredient_id FROM ingredients WHERE ingredients.name = "beetroot"), 5, "lb"),
	((SELECT recipe_id FROM recipes WHERE recipes.name = "Lasagna"), (SELECT ingredient_id FROM ingredients WHERE ingredients.name = "tomato sauce"), 1, "can"),
	((SELECT recipe_id FROM recipes WHERE recipes.name = "Lasagna"), (SELECT ingredient_id FROM ingredients WHERE ingredients.name = "mozzarella cheese"), 16, "0z"),
	((SELECT recipe_id FROM recipes WHERE recipes.name = "Lasagna"), (SELECT ingredient_id FROM ingredients WHERE ingredients.name = "ground beef"), 1, "lb"),
	((SELECT recipe_id FROM recipes WHERE recipes.name = "Lasagna"), (SELECT ingredient_id FROM ingredients WHERE ingredients.name = "lasagna noodles"), 8, "oz"),
	((SELECT recipe_id FROM recipes WHERE recipes.name = "Chicken Pot Pie"), (SELECT ingredient_id FROM ingredients WHERE ingredients.name = "chicken breast"), 1, "lb"),
	((SELECT recipe_id FROM recipes WHERE recipes.name = "Chicken Pot Pie"), (SELECT ingredient_id FROM ingredients WHERE ingredients.name = "pie crust"), 1, "package"),
	((SELECT recipe_id FROM recipes WHERE recipes.name = "Chicken Pot Pie"), (SELECT ingredient_id FROM ingredients WHERE ingredients.name = "frozen carrots"), 8, "oz"),
	((SELECT recipe_id FROM recipes WHERE recipes.name = "Chicken Pot Pie"), (SELECT ingredient_id FROM ingredients WHERE ingredients.name = "frozen peas"), 8, "oz");



-- Define cuisines table
DROP TABLE IF EXISTS cuisines;

CREATE TABLE cuisines(
	cuisine_id INT PRIMARY KEY AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) UNIQUE NOT NULL
);

-- Insert sample values into cuisines
INSERT INTO cuisines VALUES
	(0, "German"),
	(0, "American"),
	(0, "Italian");

-- Define recipe_cuisines table
DROP TABLE IF EXISTS recipe_cuisines;

CREATE TABLE recipe_cuisines(
	recipe_id INT NOT NULL REFERENCES recipes(recipe_id),
	cuisine_id INT NOT NULL REFERENCES cuisines(cuisine_id),
	PRIMARY KEY(recipe_id, cuisine_id)
);

-- Insert sample values into recipe_cuisines
INSERT into recipe_cuisines VALUES
	((SELECT recipe_id from recipes WHERE recipes.name = "Chicken Pot Pie"), (SELECT cuisine_id from cuisines WHERE cuisines.name = "American")),
	((SELECT recipe_id from recipes WHERE recipes.name = "Lasagna"), (SELECT cuisine_id from cuisines WHERE cuisines.name = "Italian")),
	((SELECT recipe_id from recipes WHERE recipes.name = "Beet Casserole"), (SELECT cuisine_id from cuisines WHERE cuisines.name = "German"));

-- Define diets table
DROP TABLE IF EXISTS diets;

CREATE TABLE diets(
	diet_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	name VARCHAR(255) UNIQUE NOT NULL
);

-- Insert sample values into diets
INSERT INTO diets VALUES
	(0, "Keto")

-- Define recipe_diets table
DROP TABLE IF EXISTS recipe_diets;

CREATE TABLE recipe_diets(
	recipe_id INT NOT NULL REFERENCES recipes(recipe_id),
	diet_id INT NOT NULL REFERENCES diets(diet_id),
	PRIMARY KEY(recipe_id, diet_id)
);

-- Insert sample values into recipe_diets
INSERT INTO recipe_diets VALUES
	((SELECT recipe_id FROM recipes WHERE recipes.name = "Beet Casserole"), (SELECT diet_id FROM diets WHERE diets.name = "Keto"));
