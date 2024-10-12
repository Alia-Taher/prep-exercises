```SQL 


-- Recipes table
CREATE TABLE recipes (
    recipe_id INT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT
);

-- Categories table
CREATE TABLE categories (
    category_id INT PRIMARY KEY,
    name TEXT NOT NULL
);

-- Ingredients table
CREATE TABLE ingredients (
    ingredient_id INT PRIMARY KEY,
    name TEXT NOT NULL
);

-- Steps table
CREATE TABLE steps (
    step_id INT PRIMARY KEY,
    description TEXT NOT NULL
);

-- Many-to-Many relation
CREATE TABLE recipe_category (
    recipe_id INT,
    category_id INT,
    PRIMARY KEY (recipe_id, category_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- Many-to-Many relation
CREATE TABLE recipe_ingredient (
    recipe_id INT,
    ingredient_id INT,
    quantity TEXT,
    unit TEXT,
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id)
);

-- Many-to-Many relation
CREATE TABLE recipe_step (
    recipe_id INT,
    step_id INT,
    step_order INT NOT NULL,
    PRIMARY KEY (recipe_id, step_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
    FOREIGN KEY (step_id) REFERENCES steps(step_id)
);


```