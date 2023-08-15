require("dotenv").config();
const express = require('express');
const router = express.Router();
const { handymenModel,expertise_handymanModel, userModel } = require('../models/index');
const barer=require('../auth/authMiddlewares/barer')

// Route: /handymen (GET all handymen)
router.get('/handymen',async (req, res, next) => {
    try {
        const allHandymen = await handymenModel.findAll();
        res.json(allHandymen);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
// Route: /handymen/genre/:genreId (GET handymen by specific genre ID)
router.get('/handymen/genre/:genreId',barer(userModel), async (req, res, next) => {
    const { genreId } = req.params;
    try {
        const handymenInGenre = await expertise_handymanModel.findAll({where:{ExpertyId:genreId}});
        res.json(handymenInGenre);
    } catch (e) {
        next(e);
    }
});

// Route: /handymen/:id (GET a specific handyman by ID)
router.get('/handymen/:id',barer(userModel), async (req, res, next) => {
    const { id } = req.params;

    try {
        const handyman = await handymenModel.findByPk(id);
        if (!handyman) {
            return res.status(404).send('Handyman not found');
        }
        handyman.password='',
        handyman.token='';
        res.json(handyman);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

