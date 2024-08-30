const { StatusCodes } = require('http-status-codes');
const { UserRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { Auth } = require('../utils/common');

const userRepository = new UserRepository();

async function createUser(data) {
  try {
    const user = await userRepository.create(data);
    return user;
  } catch (error) {
    if (error.name == 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError('Cannot create a new User object', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function signin(data) {
  try {
    const user = await userRepository.getUserByEmail(data.email);
    if (!user) {
      throw new AppError("Invalid username or password.", StatusCodes.BAD_REQUEST);
    }

    const isPasswordMatched = Auth.checkPassword(data.password, user.password);
    if (!isPasswordMatched) {
      throw new AppError("Invalid username or password.", StatusCodes.BAD_REQUEST);
    }

    const jwt = Auth.createToken({ id: user.id, email: user.email });
    return jwt;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Something went wrong while signin.', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  createUser,
  signin,
}