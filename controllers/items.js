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

const createItem = async (req, res) => {
  const item = {
    itemType: req.body.itemType,
    description: req.body.description,
    price: req.body.price,
    tagNumber: req.body.tagNumber,
    receivedDate: req.body.receivedDate,
    receivedBy: req.body.receivedBy,
    vendor: req.body.vendor,
    poNumber: req.body.poNumber,
    user_id: req.session.user._id,
    cUser: "",
    date_issued: "",
    location: "",
    issuedBy: "" 
  };

  try {
    const response = await mongodb.getDatabase().collection('items').insertOne(item);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: 'Some error occurred while creating the item.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
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

const issueOutItem = async (req, res) => {
  //#swagger-tags-['items']
  const itemId = req.params.id;
  const { deviceUserId } = req.body;

  if (!ObjectId.isValid(itemId)) {
    return res.status(400).json({ message: 'Invalid item ID.' });
  }

  if (!ObjectId.isValid(deviceUserId)) {
    return res.status(400).json({ message: 'Invalid device user ID.' });
  }

  try {
    const item = await mongodb.getDatabase().collection('items').findOne({ _id: new ObjectId(itemId) });
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found.' });
    }

    if (item.cUser) {
      return res.status(400).json({ message: 'Item has already been issued out.' });
    }

    const deviceUser = await mongodb.getDatabase().collection('device-current-user').findOne({ _id: new ObjectId(deviceUserId) });
    
    if (!deviceUser) {
      return res.status(404).json({ message: 'Device user not found.' });
    }

    const updateData = {
      cUser: deviceUserId,
      date_issued: new Date().toISOString(),
      location: deviceUser.location_id, // Ensure this is valid
      issuedBy: req.session.user._id
    };

    const response = await mongodb.getDatabase().collection('items').updateOne(
      { _id: new ObjectId(itemId) },
      { $set: updateData }
    );

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'Item issued successfully.' });
    } else {
      res.status(500).json({ message: 'Failed to issue the item.' });
    }
  } catch (err) {
    console.error('Error issuing item:', err); // Added error logging
    res.status(500).json({ message: err.message });
  }
};
    




module.exports = {
  getAll,
  getSingle,
  createItem,
  updateItem,
  deleteItem,
  issueOutItem
};