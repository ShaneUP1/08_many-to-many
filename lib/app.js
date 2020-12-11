const express = require('express');
const Ingredient = require('../Models/ingredient');
const Recipe = require('../Models/recipe');
const app = express();

app.use(express.json());

app.post('/ingredients', (req, res, next) => {
    Ingredient
        .insert(req.body)
        .then(ingredient => res.send(ingredient))
        .catch(next);

});

app.get('/ingredients/:id', (req, res, next) => {
    Ingredient
        .findById(req.params.id)
        .then(ingredient => res.send(ingredient))
        .catch(next);
});

app.get('/ingredients', (req, res, next) => {
    Ingredient
        .find()
        .then(ingredient => res.send(ingredient))
        .catch(next);
});

app.put('/ingredients/:id', (req, res, next) => {
    Ingredient
        .update(req.params.id, req.body)
        .then(ingredient => res.send(ingredient))
        .catch(next);
});

app.delete('/ingredients/:id', (req, res, next) => {
    Ingredient
        .delete(req.params.id)
        .then(ingredient => res.send(ingredient))
        .catch(next);
});



app.post('/recipes', (req, res, next) => {
    Recipe
        .insert(req.body)
        .then(recipe => res.send(recipe))
        .catch(next);
});

app.get('/recipes/:id', (req, res, next) => {
    Recipe
        .findById(req.params.id)
        .then(recipe => res.send(recipe))
        .catch(next);
});

app.get('/recipes', (req, res, next) => {
    Recipe
        .find()
        .then(recipe => res.send(recipe))
        .catch(next);
});

app.put('/recipes/:id', (req, res, next) => {
    Recipe
        .update(req.params.id, req.body)
        .then(recipe => res.send(recipe))
        .catch(next);
});

app.delete('/recipes/:id', (req, res, next) => {
    Recipe
        .delete(req.params.id)
        .then(recipe => res.send(recipe))
        .catch(next);
});

module.exports = app;

