require("dotenv").config();

const express = require('express');
const { userModel, handymenModel, companyModel } = require('../../models/index');
const cloudinary=require('cloudinary').v2;
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SERCRET
});


const jwt = require('jsonwebtoken');


// Middleware function to authenticate and authorize users based on the token
async function authenticateAndAuthorize(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Unauthorized');
  }
  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const { id, role } = decodedToken; // Extract user ID and role from the token

    req.id = id;
    req.role = role;
    next();
  } catch (err) {
    next(err);
  }
}

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
  const { role, id } = req;

  try {
    if (role === "user") {
      const user = await userModel.findByPk(id);
      // console.log('::::::::',user)
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

async function updatePersonalData(req, res,next) {
  const { role, id } = req;
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
      return; // Exit the function early
    }
    
    if (entity) {
      for (const [key, value] of Object.entries(newData)) {
        if (key !== 'id') {  // Avoid updating the ID
          entity[key] = value;
        }
      };
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
async function uploadImg(req, res,next) {
  const { role, id } = req;
    await cloudinary.uploader.upload(req.file.path,function(err,result){
      if(err){
       next(err);
      };
      req.body.profilePicUrl=result.url
    }); 
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
      return;
    }
    
    if (entity) {
      for (const [key, value] of Object.entries(newData)) {
        if (key !== 'id') {  
          entity[key] = value;
        }
      };
      await entity.save();
      res.send(entity);
    } else {
      res.status(301).send("User Not Found.");
    }
  } catch (err) {
      next(err);
  }
}

async function deletePersonalData(req, res) {
  const { role, id } = req;

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
      return; // Exit the function early
    }

    if (entity) {
      // Delete the entity
      await entity.destroy();

      res.send({ message: "Entity deleted successfully." });
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
  deletePersonalData,
  authenticateAndAuthorize,
  uploadImg
};
