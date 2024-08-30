const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

async function validateAuthRequest(req, res, next) {
  const missingFields = [];

  if (!req.body.email) {
    missingFields.push('Email');
  }

  if (!req.body.password) {
    missingFields.push('Password');
  }

  if (missingFields.length > 0) {
    const errorMessage = `${missingFields.join(', ')} ${missingFields.length > 1 ? 'are' : 'is'} missing in the request.`;
    ErrorResponse.message = 'Validation Error: Missing required fields';
    ErrorResponse.error = new AppError([errorMessage], StatusCodes.BAD_REQUEST);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(ErrorResponse);
  }

  next();
}

module.exports = {
  validateAuthRequest
};
