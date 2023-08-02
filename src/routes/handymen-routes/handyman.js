// routes/handymen-routes.js/handyman.js
const express = require("express");
const router = express.Router();
const { Handyman } = require("../models"); // Assuming you have "Handyman" model defined

// Route: /handymen
router.get("/handymen", async (req, res) => {
    try {
        // Fetch all handymen
        const allHandymen = await Handyman.findAll();
        res.json(allHandymen);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// Route: /handymen/genre/:genreId
router.get("/handymen/genre/:genreId", async (req, res) => {
    const { genreId } = req.params;

    try {
        // Fetch handymen by specific genreId
        const handymenInGenre = await Handyman.findAll({
            where: { genreId: genreId },
        });

        res.json(handymenInGenre);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// Route: /handymen/:id
router.get("/handymen/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch handyman by their id
        const handyman = await Handyman.findByPk(id);
        if (!handyman) {
            return res.status(404).send("Handyman not found");
        }

        res.json(handyman);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// Additional routes for the handyman dashboard, editing, deleting, updating can be added as needed.

module.exports = router;
