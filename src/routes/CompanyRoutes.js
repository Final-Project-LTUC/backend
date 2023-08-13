const express = require("express");
const router = express.Router();
const { companyModel } = require("../models/index"); // Import the relevant company model

// Route: /companies (GET all companies)
router.get("/companies", async (req, res, next) => {
    try {
        const allCompanies = await companyModel.findAll();
        res.json(allCompanies);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

// Route: /companies/:id (GET a specific company by ID)
router.get("/companies/:id", async (req, res, next) => {
    const { id } = req.params;

    try {
        const company = await companyModel.findByPk(id);
        if (!company) {
            return res.status(404).send("Company not found");
        }

        res.json(company);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
