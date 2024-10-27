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

  const insertRecipeIngredients = `
    INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (1, 6),
    (1, 7),
    (1, 8),
    (1, 9),
    (1, 10),
    (2, 11),
    (2, 12),
    (2, 13),
    (2, 14),
    (2, 15),
    (2, 16),
    (2, 17),
    (2, 1),
    (2, 8)
  `;
  await connection.query(insertRecipeIngredients);

  const insertRecipeSteps = `
    INSERT INTO recipe_steps (recipe_id, step_id) VALUES
    (1, 11),
    (1, 12),
    (1, 13),
    (1, 14),
    (1, 15),
    (1, 16),
    (1, 17),
    (1, 18),
    (2, 1),
    (2, 2),
    (2, 3),
    (2, 4),
    (2, 5),
    (2, 6),
    (2, 7),
    (2, 8),
    (2, 9),
    (2, 10)
  `;
  await connection.query(insertRecipeSteps);

  const queries = [
    {
      description: " All Afghan Recipes with beef",
      query: `SELECT r.title AS recipe_name, c.category AS category_name 
      FROM recipe r
      JOIN recipe_categories rc ON r.recipe_id = rc.recipe_id
      JOIN category c ON rc.category_id = c.category_id
      JOIN recipe_ingredients ri ON r.recipe_id = ri.recipe_id
      JOIN ingredients i ON ri.ingredient_id = i.ingredient_id
      WHERE c.category = 'Afghan'
        AND i.ingredient LIKE '%beef%';
`,
    },
    {
      description: "All beef and Afghan Recipes",
      query: `SELECT DISTINCT r.title AS recipe_name, c.category AS category_name
          FROM recipe r
          LEFT JOIN recipe_categories rc ON r.recipe_id = rc.recipe_id
          LEFT JOIN category c ON rc.category_id = c.category_id
          LEFT JOIN recipe_ingredients ri ON r.recipe_id = ri.recipe_id
          LEFT JOIN ingredients i ON ri.ingredient_id = i.ingredient_id
          WHERE c.category = 'Afghan' AND i.ingredient LIKE '%beef%';

`,
    },
    {
      description: "All Cakes that Need to be Baked for 30-35 minutes",
      query: `SELECT r.title AS recipe_name, c.category AS category_name
          FROM recipe r
          JOIN recipe_categories rc ON r.recipe_id = rc.recipe_id         
          JOIN category c ON rc.category_id = c.category_id               
          JOIN recipe_steps rs ON r.recipe_id = rs.recipe_id            
          JOIN steps s ON rs.step_id = s.step_id                          
          WHERE c.category = 'Dessert'                                    
            AND s.step LIKE '%Bake for 30-35 minutes%';                                     
          `,
    },
  ];

  for (const { description, query } of queries) {
    console.log(description);
    const [rows] = await connection.query(query);
    console.table(rows);
  }

  connection.end();
}

main();
