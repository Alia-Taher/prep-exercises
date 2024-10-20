const mysql = require("mysql2/promise");

async function main() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
  });

  await connection.query("DROP DATABASE IF EXISTS recipes");
  await connection.query("CREATE DATABASE recipes");
  await connection.query("USE recipes");

  const createTableCategories = `CREATE TABLE category (
      category_id INT AUTO_INCREMENT PRIMARY KEY,
      category VARCHAR(255) NOT NULL UNIQUE
  )`;

  const createTableIngredients = `CREATE TABLE ingredients (
      ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
      ingredient VARCHAR(255) NOT NULL UNIQUE
  )`;

  const createTableSteps = `CREATE TABLE steps (
      step_id INT AUTO_INCREMENT PRIMARY KEY,
      step VARCHAR(900) NOT NULL
  )`;

  const createTableRecipes = `CREATE TABLE recipe (
      recipe_id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      category_id INT,
      FOREIGN KEY (category_id) REFERENCES category(category_id)
  )`;

  const createTableRecipeIngredients = `CREATE TABLE recipe_ingredients (
      recipe_id INT,
      ingredient_id INT,
      FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id),
      FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id),
      PRIMARY KEY (recipe_id, ingredient_id)
  )`;

  const createTableRecipeSteps = `CREATE TABLE recipe_steps (
      recipe_id INT,
      step_id INT,
      FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id),
      FOREIGN KEY (step_id) REFERENCES steps(step_id),
      PRIMARY KEY (recipe_id, step_id)
  )`;

  const createTableRecipeCategories = `CREATE TABLE recipe_categories (
    recipe_id INT,
    category_id INT,
    FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id),
    FOREIGN KEY (category_id) REFERENCES category(category_id),
    PRIMARY KEY (recipe_id, category_id)
    )`;

  await connection.query(createTableCategories);
  await connection.query(createTableIngredients);
  await connection.query(createTableSteps);
  await connection.query(createTableRecipes);  
  await connection.query(createTableRecipeCategories);
  await connection.query(createTableRecipeIngredients);
  await connection.query(createTableRecipeSteps);


  const insertCategory =
    "INSERT INTO category (category) VALUES ('Dessert'),('Main Course'), ('Afghan'), ('Meat')";

  const insertIngredients =
    "INSERT INTO ingredients (ingredient) VALUES ('All purpose flour'), ('sugar'), ('cocoa powder'), ('baking powder'), ('baking soda'), ('eggs'), ('milk'), ('vegetable oil'), ('vanilla extract'), ('boiling water'), ('Ground beef'), ('onion'), ('salt'), ('black pepper'), ('yogurt'), ('garlic'), ('dried mint')";

  const insertSteps = `INSERT INTO steps (step) VALUES 
    ('Mix flour, water, and salt in a bowl.'),
    ('Knead the dough until smooth and elastic.'),
    ('Let the dough rest for 30 minutes.'),
    ('Mix beef, onion, salt, and pepper in a bowl.'),
    ('Roll out the dough and cut into circles.'),
    ('Place beef mixture in the center of each circle.'),
    ('Fold and seal the dough over the beef.'),
    ('Steam the mantu for 30 minutes.'),
    ('Mix yogurt, garlic, and mint in a bowl.'),
    ('Serve mantu with yogurt sauce.'),
    ('Preheat oven to 350°F (175°C).'),
    ('Grease and flour two round pans.'),
    ('Mix sugar, flour, cocoa, baking powder, baking soda, and salt in a bowl.'),
    ('Add eggs, milk, oil, and vanilla; mix for 2 minutes.'),
    ('Stir in boiling water.'),
    ('Pour into prepared pans.'),
    ('Bake for 30-35 minutes; test with a toothpick.'),
    ('Cool in pans for 10 minutes, then on a wire rack.');`;

  await connection.query(insertCategory);
  await connection.query(insertIngredients);
  await connection.query(insertSteps);

  const insertRecipe =
    "INSERT INTO recipe (title, category_id) VALUES ('Chocolate Cake', 1), ('Mantu', 3)";

  await connection.query(insertRecipe);


  const insertRecipeCategories = `
    INSERT INTO recipe_categories (recipe_id, category_id) VALUES
    (1, 1), 
    (2, 3),  
    (2, 4)   
  `;
  await connection.query(insertRecipeCategories);
  connection.end();
}



main();
