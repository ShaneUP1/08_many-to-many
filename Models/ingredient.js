/* eslint-disable indent */
const pool = require('../lib/utils/pool');


module.exports = class Ingredient {
    id;
    name;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
    }

    static async insert({ name, recipes = [] }) {
        const { rows } = await pool.query(
            'INSERT INTO ingredients (name) VALUES ($1) RETURNING *',
            [name]
        );

        await pool.query(
            `INSERT INTO recipes_ingredients (ingredients_id, recipes_id)
            SELECT ${rows[0].id}, ID FROM recipes WHERE name=ANY($1::text[])`,
            [recipes]
        );
        return new Ingredient(rows[0]);
    }

    static async findById(id) {
        const { rows } = await pool.query(
            `SELECT
                ingredients.*,
                json_agg(recipes.name) AS recipes
            FROM
                recipes_ingredients
            JOIN ingredients
            ON recipes_ingredients.ingredients_id = ingredients.id
            JOIN recipes
            ON recipes_ingredients.recipes_id = recipes.id
            WHERE ingredients.id=$1
            GROUP BY ingredients.id`,
            [id]
        );
        if (!rows[0]) throw new Error('Never heard of it!');
        return {
            ...new Ingredient(rows[0]),
            recipes: rows[0].recipes
        };
    }

    static async find() {
        const { rows } = await pool.query(
            'SELECT * FROM ingredients'
        );
        return rows.map(row => new Ingredient(row));
    }

    static async update(id, { name }) {
        const { rows } = await pool.query(
            `UPDATE ingredients
                SET NAME = $1 
                WHERE id = $2
                RETURNING * `,
            [name, id]
        );
        return new Ingredient(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            `DELETE FROM ingredients
            WHERE id = $1
            RETURNING * `,
            [id]
        );
        return new Ingredient(rows[0]);
    }


};
