const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger-tags-['items']
    try {
        const location = await mongodb
        .getDatabase()
        .collection('Location')
        .find()
        .toArray()
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(location);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
};

const getSingle = async (req, res) => {
    //#swagger-tags-['items']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid location id to find the location.');
    }
    try {
    const locationId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDatabase()
        .collection('items')
        .findOne({ _id: locationId })
    console.log(result);
    if (result) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: 'location not found' });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
};

const createLocation = async (req, res) => {
  const location = {
    locationName: req.body.locationName,
    extension: req.body.extension,
  };
  try {
    const response = await mongodb.getDatabase().collection('Location').insertOne(item);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: 'Some error occurred while creating the location.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const updateLocation = async (req, res) => {
    //#swagger-tags-['items']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid item id to update a location.');
      }
    const locationId = new ObjectId(req.params.id);
    const location = {
        locationName: req.body.locationName,
        extension: req.body.extension,
    };
    const response = await mongodb
        .getDatabase()
        .collection('items')
        .replaceOne({ _id: locationId }, location);
    console.log(response);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the location.');
        }
};

const deleteLocation = async (req, res) => {
    //#swagger-tags-['items']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid item id to delete an item.');
      }
    const itemId = new ObjectId(req.params.id);
    try {
        const response = await mongodb
          .getDatabase()
          .collection('items')
          .deleteOne({ _id: itemId });
        console.log(response);
        if (response.deletedCount > 0) {
          res.status(204).send();
        } else {
          return res.status(404).json({ message: 'item not found.' });
        }
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    };


module.exports = {
  getAll,
  getSingle,
  createLocation,
  updateLocation,
  deleteLocation
};