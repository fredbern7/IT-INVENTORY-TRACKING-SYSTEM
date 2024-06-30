const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger-tags-['items']
    try {
        const items = await mongodb
        .getDatabase()
        .collection('items')
        .find()
        .toArray()
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(items);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
};

const getSingle = async (req, res) => {
    //#swagger-tags-['items']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user id to find a item.');
    }
    try {
    const itemId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDatabase()
        .collection('items')
        .findOne({ _id: itemId })
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

const createItem = async (req, res) => {
    //#swagger-tags-['items']
    const item = {
        itemType: req.body.itemType,
        description: req.body.description,
        price: req.body.price,
        tagNumber: req.body.tagNumber,
        receivedDate: req.body.receivedDate,
        vendor: req.body.vendor,
        poNumber: req.body.poNumber
    };
    const response = await mongodb
        .getDatabase()
        .collection('items')
        .insertOne(item);
    if (response.acknowledged) {
        res.status(201).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the item.');
    }

};

const updateItem = async (req, res) => {
    //#swagger-tags-['items']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid item id to update a item.');
      }
    const itemId = new ObjectId(req.params.id);
    const item = {
        itemType: req.body.itemType,
        description: req.body.description,
        price: req.body.price,
        tagNumber: req.body.tagNumber,
        receivedDate: req.body.receivedDate,
        vendor: req.body.vendor,
        poNumber: req.body.poNumber
    };
    const response = await mongodb
        .getDatabase()
        .collection('items')
        .replaceOne({ _id: itemId }, item);
    console.log(response);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the item.');
        }
};

const deleteItem = async (req, res) => {
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
    createItem,
    updateItem,
    deleteItem
};