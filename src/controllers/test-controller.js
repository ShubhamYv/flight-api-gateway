const { StatusCodes } = require("http-status-codes");

async function testAPI(req, res) {
  try {
    return res.status(StatusCodes.OK).send("Hello, World!");
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

module.exports = {
  testAPI,
}