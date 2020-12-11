const pool = require('../lib/utils/pool');

module.exports = class Recipe {
    id;
    name;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
    }

    static async insert({ name }) {
        const { rows } = await pool.query(
            `INSERT INTO recipes (name) VALUES ($1) RETURNING *`,
            [name]
        );
        return new Recipe(rows[0]);
    }

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM recipes WHERE id=$1',
            [id]
        );
        if (!rows) throw new Error('No recipes by that ID round here.');
        return new Recipe(rows[0]);
    }

    static async find() {
        const { rows } = await pool.query(
            `SELECT * FROM recipes`
        );
        return rows.map(row => new Recipe(row));
    }

    static async update(id, { name }) {
        const { rows } = await pool.query(
            `UPDATE recipes 
            SET NAME=$1
            WHERE id=$2
            RETURNING *`,
            [name, id]
        );
        return new Recipe(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            `DELETE FROM recipes 
            WHERE id=$1
            RETURNING *`,
            [id]
        );
        return new Recipe(rows[0]);
    }

};
