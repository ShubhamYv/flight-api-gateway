const express = require('express');
const { UserController } = require('../../controllers');
const { AuthMiddlewares } = require('../../middlewares');

const router = express.Router();

router
  .post('/signup',
    AuthMiddlewares.validateAuthRequest,
    UserController.createUser);

router
  .post('/signin',
    AuthMiddlewares.validateAuthRequest,
    UserController.signin);

router
  .post('/role',
    AuthMiddlewares.checkAuth,
    AuthMiddlewares.isAdmin,
    UserController.addRoleToUser);


router.get('/:userId', UserController.getUserById);

module.exports = router;