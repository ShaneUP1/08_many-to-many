const express = require('express');
const Ingredient = require('../models/ingredient');

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
})

module.exports = app;
