const validator = require('../helpers/validate');

const validate = (rules) => {
  return (req, res, next) => {
    validator(req.body, rules, {}, (err, status) => {
      if (!status) {
        return res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      }
      next();
    });
  };
};

const saveItem = validate({
  itemType: 'required|string',
  description: 'required|string',
  price: 'required|numeric',
  tagNumber: 'required|string',
  receivedDate: 'required|string',
  vendor: 'required|string',
  poNumber: 'required|string'
});

const saveUser = validate({
  firstName: 'required|string',
  middleName: 'string',
  lastName: 'required|string',
  email: 'required|email|email_exists',
  password: 'required|string|min:8',
});

module.exports = {
  saveItem,
  saveUser
};
