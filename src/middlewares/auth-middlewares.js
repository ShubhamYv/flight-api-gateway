const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');
const { UserService } = require('../services');

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

async function checkAuth(req, res, next) {
  try {
    const response = await UserService.isAuthenticated(req.headers['x-access-token']);
    if (response) {
      req.user = response;
      next();
    }
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode)
      .json(ErrorResponse);
  }
}

module.exports = {
  validateAuthRequest,
  checkAuth,
};
