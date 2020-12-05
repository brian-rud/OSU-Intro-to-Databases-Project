-- Define recipes table
DROP TABLE IF EXISTS recipes;

CREATE TABLE recipes (
	recipe_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	recipe_url VARCHAR(255) NOT NULL,
	name VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL,
	cuisine_id INT DEFAULT NULL,
	diet_Id INT DEFAULT NULL,
	meal_id INT DEFAULT NULL,
	CONSTRAINT recipe_cuisine FOREIGN KEY (cuisine_id) REFERENCES cuisines (cuisine_id) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT recipe_diet FOREIGN KEY (diet_id) REFERENCES diets (diet_id) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT recipe_meal FOREIGN KEY (meal_id) REFERENCES meals (meal_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Insert sample recipes
INSERT INTO recipes (recipe_url, name, description, cuisine_id, diet_id, meal_id) VALUES
	("https://www.schrutefarmsrecipes.com", "Beet Casserole", "Baked beetroot casserole", 2, 3, 2),
	("https://www.phillyinquirer.com", "Lasagna", "Beef lasagna with tomato sauce", 3, 4, 3),
	("https://www.foodnetwork.com", "Chicken Pot Pie", "Chicken pie with flaky crust", 1, 4, 3);

-- Define ingredients table
DROP TABLE IF EXISTS ingredients;

CREATE TABLE ingredients(
	ingredient_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	name VARCHAR(255) NOT NULL
);

-- Insert sample ingredients
INSERT INTO ingredients (name) VALUES
	("chicken breast"),
	("beetroot"),
	("tomato sauce"),
	("mozzarella cheese"),
	("lasagna noodles"),
	("ground beef"),
	("pie crust"),
	("heavy cream"),
	("frozen peas"),
	("frozen carrots");

-- Define recipe_ingredients table
DROP TABLE IF EXISTS recipe_ingredients;

CREATE TABLE recipe_ingredients(
	recipe_id INT NOT NULL,
	ingredient_id INT NOT NULL,
	quantity DECIMAL NOT NULL,
	unit VARCHAR(255) NOT NULL,
	PRIMARY KEY (recipe_id, ingredient_id),
    CONSTRAINT recipe_ingredients_fk_1 FOREIGN KEY (recipe_id) REFERENCES cs340_project_test.recipes (recipe_id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT recipe_ingredients_fk_2 FOREIGN KEY (ingredient_id) REFERENCES cs340_project_test.ingredients (ingredient_id) ON UPDATE CASCADE ON DELETE CASCADE
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
INSERT INTO cuisines (name) VALUES
	("German"),
	("American"),
	("Italian");

-- Define diets table
DROP TABLE IF EXISTS diets;

CREATE TABLE diets(
	diet_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	name VARCHAR(255) UNIQUE NOT NULL
);

-- Insert sample values into diets
INSERT INTO diets (name) VALUES
    ("Keto"),
    ("Vegetarian"),
    ("Vegan"),
    ("Paleo");

-- Define meals table
DROP TABLE IF EXISTS meals;

CREATE TABLE meals(
    meal_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) UNIQUE NOT NULL
);

-- Insert sample values into meals
INSERT INTO meals (name) VALUES
    ("Breakfast"),
    ("Lunch"),
    ("Dinner");

