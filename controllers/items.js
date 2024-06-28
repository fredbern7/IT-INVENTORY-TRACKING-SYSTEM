const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger-tags-['Contacts']
    const result = await mongodb.getDatabase().collection('items').find();
    result.toArray().then((items) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(items);
    });
};

const getSingle = async (req, res) => {
    //#swagger-tags-['Contacts']
    const itemId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('items').findOne({ _id: itemId });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};


module.exports = {
    getAll,
    getSingle
};