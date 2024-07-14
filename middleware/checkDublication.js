const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const checkDuplicateEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userId = req.params.id ? new ObjectId(req.params.id) : null;
    
    const user = await mongodb
      .getDatabase()
      .collection('users')
      .findOne({ email: email });

    if (user && (!userId || user._id.toString() !== userId.toString())) {
      return res.status(400).json({ message: 'Email already been used' });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error while checking email' });
  }
};

const checkDuplicateTagNumber = async (req, res, next) => {
  try {
    const { tagNumber } = req.body;
    const itemId = req.params.id ? new ObjectId(req.params.id) : null;
    
    const item = await mongodb
      .getDatabase()
      .collection('items')
      .findOne({ tagNumber: tagNumber });

    if (item && (!itemId || item._id.toString() !== itemId.toString())) {
      return res.status(400).json({ message: 'Tag Number already been used' });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error while checking Tag Number' });
  }
};

const checkDuplicateLocation = async (req, res, next) => {
  try {
    const { locationName } = req.body;
    const locationId = req.params.id ? new ObjectId(req.params.id) : null;
    
    const location = await mongodb
      .getDatabase()
      .collection('Location')
      .findOne({ locationName: locationName });

    if (location && (!locationId || location._id.toString() !== locationId.toString())) {
      return res.status(400).json({ message: 'This name is already been used' });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error while checking Location' });
  }
};


module.exports = {
  checkDuplicateEmail,
  checkDuplicateTagNumber,
  checkDuplicateLocation
};