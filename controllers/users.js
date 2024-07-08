const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');

const getAll = async (req, res) => {
  //#swagger-tags-['Users']
  try {
    const lists = await mongodb
      .getDatabase()
      .collection('users')
      .find()
      .toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger-tags-['Users']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid contact id to find a contact.');
  }
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .collection('users')
      .findOne({ _id: userId });
    console.log(result);
    if (result) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  //#swagger-tags-['Users']
  const user = {
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  };

  try {
    user.password = await bcrypt.hash(user.password, 10);
    console.log(`Hashed Password: ${user.password}`);
    const response = await mongodb
      .getDatabase()
      .collection('users')
      .insertOne(user);
    console.log(response);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: 'Some error occurred while creating the user.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  //#swagger-tags-['Users']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid user id to update a user.');
  }
  const userId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  };

  try {
    user.password = await bcrypt.hash(user.password, 10);
    console.log(`Hashed Password: ${user.password}`); // Debug log
    const response = await mongodb
      .getDatabase()
      .collection('users')
      .replaceOne({ _id: userId }, user);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Some error occurred while updating the user.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message }); // Corrected syntax here
  }
};


const deleteUser = async (req, res) => {
  //#swagger-tags-['Users']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid item id to delete a user.');
  }
  const userId = new ObjectId(req.params.id);
  try {
    const response = await mongodb
      .getDatabase()
      .collection('users')
      .deleteOne({ _id: userId });
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      return res.status(404).json({ message: 'User not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Some error occurred while deleting the user.' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
};