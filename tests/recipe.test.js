/* eslint-disable indent */
const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const Recipe = require('../Models/recipe');
const pool = require('../lib/utils/pool');

describe('recipe routes', () => {
    beforeEach(() => {
        return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));

    });
    afterAll(() => {
        return pool.end();
    });

    it('creates a new recipes via POST', async () => {
        const response = await request(app)
            .post('/recipes')
            .send({
                name: 'spaghetti'
            });

        expect(response.body).toEqual({
            id: '1',
            name: 'spaghetti'
        });
    });

    it('finds an existing recipe by id via GET', async () => {
        const recipes = await Promise.all([
            { name: 'pizza' },
            { name: 'meatloaf' },
            { name: 'salad' }
        ].map(recipe => Recipe.insert(recipe)));

        const response = await request(app)
            .get('/recipes/1')
            .send(recipes[0]);

        expect(response.body).toEqual(recipes[0]);

    });

    it('finds all recipes via GET', async () => {
        const recipes = await Promise.all([
            { name: 'pizza' },
            { name: 'meatloaf' },
            { name: 'salad' }
        ].map(recipe => Recipe.insert(recipe)));

        const response = await request(app)
            .get('/recipes');

        expect(response.body).toEqual(expect.arrayContaining(recipes));
        expect(response.body).toHaveLength(recipes.length);
    });

    it('updates an existing recipe by id via PUT', async () => {
        const recipes = await Promise.all([
            { name: 'pizza' },
            { name: 'meatloaf' },
            { name: 'salad' }
        ].map(recipe => Recipe.insert(recipe)));

        const response = await request(app)
            .put('/recipes/1')
            .send({
                name: 'lasagna'
            });

        expect(response.body).toEqual({ id: '1', name: 'lasagna' });
    });

    it('deletes an existing recipe by id via DELETE', async () => {
        const recipes = await Promise.all([
            { name: 'pizza' },
            { name: 'meatloaf' },
            { name: 'salad' }
        ].map(recipe => Recipe.insert(recipe)));

        const response = await request(app)
            .delete(`/recipes/${recipes[0].id}`);

        expect(response.body).toEqual(recipes[0]);
    });
});
