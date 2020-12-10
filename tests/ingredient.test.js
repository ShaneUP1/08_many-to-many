const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const Ingredient = require('../models/ingredient');
const pool = require('../lib/utils/pool');

describe('ingredient routes', () => {
    beforeEach(() => {
        return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));

    });

    afterAll(() => {
        return pool.end();
    });

    it('creates a new ingredient via POST', async () => {
        const response = await request(app)
            .post('/ingredients')
            .send({
                name: 'cucumber'
            });

        expect(response.body).toEqual({
            id: expect.any(String),
            name: 'cucumber'
        });
    });

    it('finds a single ingredient by id via GET', async () => {
        const ingredients = await Promise.all([
            { name: 'squash' },
            { name: 'cucumber' },
            { name: 'corn' }
        ].map(ingredient => Ingredient.insert(ingredient)));

        const response = await request(app)
            .get('/ingredients/1');

        expect(response.body).toEqual(ingredients[0]);
    });

    it('finds all ingredients via GET', async () => {
        const ingredients = await Promise.all([
            { name: 'squash' },
            { name: 'cucumber' },
            { name: 'corn' }
        ].map(ingredient => Ingredient.insert(ingredient)));

        const response = await request(app)
            .get('/ingredients');

        expect(response.body).toEqual(expect.arrayContaining(ingredients));
    });

    it('updates an existing ingredient by id via PUT', async () => {
        const ingredients = await Promise.all([
            { name: 'squash' },
            { name: 'cucumber' },
            { name: 'corn' }
        ].map(ingredient => Ingredient.insert(ingredient)));

        const response = await request(app)
            .put('/ingredients/1')
            .send({
                name: 'arugula'
            });

        expect(response.body).toEqual(
            { id: '1', name: 'arugula' }
        );
    });

    it('deletes an existing ingredient by id via DELETE', async () => {
        const ingredients = await Promise.all([
            { name: 'squash' },
            { name: 'cucumber' },
            { name: 'corn' }
        ].map(ingredient => Ingredient.insert(ingredient)));

        const response = await request(app)
            .delete('/ingredients/3')

        expect(response.body).toEqual({ id: '3', name: 'cucumber' })
    });


});
