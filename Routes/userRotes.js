const express = require('express');
const router = express.Router();
const { Users } = require('../models'); // Replace with your actual model imports

// Route to get all experties
router.get('/experties', async (req, res) => {
  try {
    // Your logic to fetch all experties from the database
    // Example:
    const experties = await Experties.findAll();
    res.json(experties);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get all companies
router.get('/companies', async (req, res) => {
  try {
    // Your logic to fetch all companies from the database
    // Example:
    const companies = await Companies.findAll();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
