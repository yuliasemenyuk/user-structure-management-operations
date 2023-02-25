const { httpError } = require('../helpers');

const validation = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        throw httpError(400, error.message);
      }
      next();
    };
  };
  
  module.exports = validation;