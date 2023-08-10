require("dotenv").config();
const express = require('express');
const router = express.Router();
const { expertyModel,handymenModel } = require('../models/index');

router.get('/experties/:id/handymen', async (req, res, next) => {
    const { id } = req.params;

    try {
        const experty = await expertyModel.findByPk(id);
        
        if (!experty) {
            return res.status(404).send('Experty not found');
        }

        const handymenInGenre = await handymenModel.findAll({
            where: { genreId: experty.id },
        });

        // Send an object containing both experty and handymenInGenre data
        res.json({ experty: experty, handymenInGenre: handymenInGenre });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/experties', async (req, res, next) => {
    const { name } = req.body;

    try {
        const newExperty = await expertyModel.create({
            name: name,
        });

        res.status(201).json(newExperty); // 201 Created status code
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }})

// Route: /handymen (GET all handymen)
router.get('/experties', async (req, res, next) => {
    try {
        const allHandymen = await expertyModel.findAll();
        res.json(allHandymen);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
// Route: /handymen/genre/:genreId (GET handymen by specific genre ID)
router.get('/experties/genre/:genreId', async (req, res, next) => {
    const { genreId } = req.params;

    try {
        const handymenInGenre = await expertyModel.findAll({
            where: { genre: genreId },
        });

        res.json(handymenInGenre);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Route: /handymen/:id (GET a specific handyman by ID)
router.get('/experties/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        const handyman = await expertyModel.findByPk(id);
        if (!handyman) {
            return res.status(404).send('Handyman not found');
        }

        res.json(handyman);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

