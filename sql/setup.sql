DROP TABLE IF EXISTS ingredients CASCADE;
DROP TABLE IF EXISTS recipes CASCADE;
DROP TABLE IF EXISTS recipes_ingredients;

CREATE TABLE ingredients (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE recipes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE recipes_ingredients (
    ingredients_id BIGINT REFERENCES ingredients(id),
    recipes_id BIGINT REFERENCES recipes(id),
    PRIMARY KEY(ingredients_id, recipes_id)
);