const express = require('express');
const router = express.Router();
const userRoutes = require('./user-routes');
const { AuthMiddlewares } = require('../../middlewares');
const { TestController } = require('../../controllers');

router.use('/user', userRoutes);

router.get('/test', AuthMiddlewares.checkAuth, TestController.testAPI);

module.exports = router;