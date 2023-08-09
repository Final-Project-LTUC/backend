require("dotenv").config();

const express = require('express');
const router = express.Router();

const { userModel, handymenModel, companyModel } = require('../../models/index');

// // Route: /users/:id (GET user's own information)
// router.get('/:id', async (req, res, next) => {
//     const { id } = req.params;

//     try {
//         const user = await userModel.findByPk(id);
//         if (!user) {
//             return res.status(404).send('User not found');
//         }

//         res.json(user);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Route: /users/:id (PATCH update user's own information)
// router.patch('/:id', async (req, res, next) => {
//     const { id } = req.params;

//     try {
//         const user = await userModel.findByPk(id);
//         if (!user) {
//             return res.status(404).send('User not found');
//         }

//         // Update user information based on the request body
//         const { username, phoneNumber, email } = req.body;
//         user.username = username || user.username;
//         user.phoneNumber = phoneNumber || user.phoneNumber;
//         user.email = email || user.email;

//         // Save the updated user information to the database
//         await user.save();

//         res.json(user);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//     }
// });

// module.exports = router;



// GET personal data for the user, handyman, or company
async function getPersonalData(req, res) {
  const { role, id } = req.query;

  try {
    if (role === "user") {
      const user = await userModel.findByPk(id);
      res.send(user);
    } else if (role === "handyman") {
      const handyman = await handymenModel.findByPk(id);
      res.send(handyman);
    } else if (role === "company") {
      const company = await companyModel.findByPk(id);
      res.send(company);
    } else {
      res.status(400).send("Invalid role parameter.");
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
}

// UPDATE personal data for the user, handyman, or company
async function updatePersonalData(req, res) {
  const { role, id } = req.query;
  const newData = req.body;

  try {
    let entity;
    if (role === "user") {
      entity = await userModel.findByPk(id);
    } else if (role === "handyman") {
      entity = await handymenModel.findByPk(id);
    } else if (role === "company") {
      entity = await companyModel.findByPk(id);
    } else {
      res.status(400).send("Invalid role parameter.");
    }

    if (entity) {
      // Update the fields provided in the newData object
      for (const [key, value] of Object.entries(newData)) {
        entity[key] = value;
      }

      // Save the updated entity
      await entity.save();

      res.send(entity);
    } else {
      res.status(404).send("Entity not found.");
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  getPersonalData,
  updatePersonalData,
};