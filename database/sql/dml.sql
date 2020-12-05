-- $-character being used to denote the variables that will have
-- data from the backend programming language

### Recipes ###
# Retrieve all
SELECT * FROM recipes;

# Retrieve one
SELECT * FROM recipes WHERE recipes.recipe_id = $recipe_id;

# Add one
INSERT INTO recipes (user_id, recipe_url, name, description, meal, serving_amount) VALUES ($user_id, $recipe_url, $name, $description, $meal, $serving_amount);

# Update one
UPDATE recipes SET $column_name = $value WHERE recipe_id = $recipe_id;

# Delete one
DELETE FROM recipes WHERE recipe_id = $recipe_id;

### Ingredients ###
# Retrieve all
SELECT * FROM ingredients;

# Add one
INSERT INTO ingredients (name) VALUES ($name);

# Update one
UPDATE ingredients SET name=$name WHERE ingredient_id=$ingredient_id;

# Delete one
DELETE FROM ingredients WHERE ingredient_id=$ingredient_id;

### Cuisines ###
# Retrieve all
SELECT * FROM cuisines;

# Add one
INSERT INTO cuisines (name) VALUES ($name);

# Update one
UPDATE cuisines SET name=$name WHERE cuisine_id=$cuisine_id;

# Delete one
DELETE FROM cuisines WHERE cuisine_id=$cuisine_Id;

### Diets ###
# Retrieve all
SELECT * FROM diets;

# Add one
INSERT INTO diets (name) VALUES ($name);

# Update one
UPDATE diets SET name=$name WHERE diet_id=$diet_id;

# Delete one
DELETE FROM diets WHERE diet_id=$diet_id;

### Meals ###
# Retrieve all
SELECT * FROM meals;

# Add one
INSERT INTO meals (name) VALUES ($name);

# Update one
UPDATE meals SET name=$name WHERE meal_id=$meal_id;

# Delete one
DELETE FROM meals WHERE meal_id=$meal_id;

### Recipe_Ingredients composite entity ###
# Retrieve one
SELECT * FROM recipe_ingredients WHERE recipe_id=$recipe_id AND ingredient_id=$ingredient_id;

# Add one
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES ($recipe_id, $ingredient_id, $quantity, $unit);

# Update one
UPDATE recipe_ingredients SET $column_name=$value WHERE recipe_id=$recipe_id AND ingredient_id=$ingredient_id;

# Delete one
DELETE FROM recipe_ingredients WHERE recipe_id=$recipe_id AND ingredient_id=$ingredient_id;

