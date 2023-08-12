const { Sequelize, DataTypes } = require('sequelize');
const { userModel, handymenModel, companyModel,expertyModel } = require('../../src/models/');

const DATABASE_URL = process.env.TEST_DBURL || 'sqlite::memory:';
const sequelize = new Sequelize(DATABASE_URL);
function generateRandomName() {
    const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'William', 'Olivia', 'James', 'Sophia'];
    const lastNames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis'];

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return `${firstName} ${lastName}`;
}


const handymanData = {
    username: `${generateRandomName()}`,
    phoneNumber: '10',
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    email: `${generateRandomName()}`,
    yearsOfExperience: 5,
    hourlyRate: 25.0,
    alt: 'Altitude',
    long: 'Longitude',
    rating: 4.8,
    description: 'Experienced handyman with various skills.',
    genreId: 1, // Replace with the actual genre ID
    languages: 'English, Spanish',
    role: 'handyman',
    password: 'hashed_password_here', // Replace with the actual hashed password
  };

  const companyData = {
    username: `${generateRandomName()}`,
    name: 'Example Company',
    password: 'hashed_password_here', // Replace with the actual hashed password
    numberOfEmployes: '100+',
    rating: 4,
    email: `${generateRandomName()}`,
    phoneNumber: '90',
    alt: 'Company Altitude',
    long: 'Company Longitude',
    description: 'A leading company in various services.',
    role: 'company',
  };
  const userData = {
    username:`${generateRandomName()}`,
    password: 'hashed_password_here', // Replace with the actual hashed password
    phoneNumber: '98',
    languages: 'English, Spanish',
    alt: 'User Altitude',
    long: 'User Longitude',
    email:`${generateRandomName()}`,
    rating: 4,
    role: 'user',
  };
  const newData = {
    name: 'Example Name',
    
  };

  (async () => {
    try {
      // Sync all models to the database (create tables)
      await sequelize.sync({ force: true });
  
      // Insert test data
      
      await expertyModel.create(newData)
      await userModel.create(userData);
      
      await companyModel.create(companyData);
      await handymenModel.create(handymanData);
  
      // Continue inserting test data for other models
  
      console.log('Test database has been set up with test data.');
    } catch (error) {
      console.error('Error setting up test database:', error);
    } finally {
      // Close the database connection
      await sequelize.close();
    }
  })();