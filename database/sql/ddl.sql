-- Define recipes table
DROP TABLE IF EXISTS recipes;

CREATE TABLE recipes (
	recipe_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	recipe_url VARCHAR(255) NOT NULL,
	name VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL,
	serving_amount INT NOT NULL
);

-- Insert sample recipes
INSERT INTO recipes (recipe_url, name, description, serving_amount) VALUES
	("https://www.schrutefarmsrecipes.com", "Beet Casserole", "Baked beetroot casserole", 6),
	("https://www.phillyinquirer.com", "Lasagna", "Beef lasagna with tomato sauce", 8),
	("https://www.foodnetwork.com", "Chicken Pot Pie", "Chicken pie with flaky crust", 1);

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
INSERT INTO cuisines (name) VALUES
	("German"),
	("American"),
	("Italian");

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

-- Define recipe_diets table
DROP TABLE IF EXISTS recipe_diets;

CREATE TABLE recipe_diets(
	recipe_id INT NOT NULL REFERENCES recipes(recipe_id),
	diet_id INT NOT NULL REFERENCES diets(diet_id),
	PRIMARY KEY(recipe_id, diet_id)
);

-- Insert sample values into recipe_diets
INSERT INTO recipe_diets VALUES
	((SELECT recipe_id FROM recipes WHERE recipes.name="Beet Casserole"), (SELECT diet_id FROM diets WHERE diets.name="Keto"));

-- Define recipe_meals table
DROP TABLE IF EXISTS recipe_meals;

CREATE TABLE recipe_meals(
    recipe_id INT NOT NULL REFERENCES recipes(recipe_id),
    meal_id INT NOT NULL references meals(meal_id),
    PRIMARY KEY(recipe_id, meal_id)
);

-- Insert sample values into recipe_meals
INSERT INTO recipe_meals VALUES
    ((SELECT recipe_id FROM recipes WHERE recipes.name="Beet Casserole"), (SELECT meal_id FROM meals WHERE meals.name="Breakfast"));