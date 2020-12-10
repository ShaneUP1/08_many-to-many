const pool = require('../lib/utils/pool');


module.exports = class Ingredient {
    id;
    name;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
    }

    static async insert({ name }) {
        const { rows } = await pool.query(
            'INSERT INTO ingredients (name) VALUES ($1) RETURNING *',
            [name]
        );
        return new Ingredient(rows[0]);
    }

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM ingredients WHERE id=$1',
            [id]
        );
        if (!rows[0]) throw new Error('Never heard of it!');
        return new Ingredient(rows[0]);
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
                SET NAME=$1 
                WHERE id=$2
                RETURNING *`,
            [name, id]
        );
        return new Ingredient(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            `DELETE FROM ingredients
            WHERE id=$1
            RETURNING *`,
            [id]
        );
        return new Ingredient(rows[0]);
    }


};
