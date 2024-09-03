const { StatusCodes } = require('http-status-codes');
const { UserService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function createUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserService.createUser({ email, password });
    SuccessResponse.data = user;
    return res
      .status(StatusCodes.CREATED)
      .json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode)
      .json(ErrorResponse);
  }
}

async function signin(req, res) {
  try {
    const { email, password } = req.body;
    const response = await UserService.signin({ email, password });
    SuccessResponse.data = response;
    return res
      .status(StatusCodes.OK)
      .json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode)
      .json(ErrorResponse);
  }
}

async function addRoleToUser(req, res) {
  try {
    console.log("Inside user controller");
    console.log("req", req.body.id);
    console.log("req", req.body.role);

    const { id, role } = req.body;
    const response = await UserService.addRoleToUser({ id, role });
    SuccessResponse.data = response;
    return res
      .status(StatusCodes.OK)
      .json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode)
      .json(ErrorResponse);
  }
}

async function getUserById(req, res) {
  try {
    const response = await UserService.getUserById(req.params.userId);
    SuccessResponse.data = response;
    return res
      .status(StatusCodes.OK)
      .json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

module.exports = {
  createUser,
  signin,
  addRoleToUser,
  getUserById,
}