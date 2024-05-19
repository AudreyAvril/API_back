import express from 'express';
import controllerWrapper from '../../helpers/controller.wrapper.js';
import usersController from '../../controllers/api/users.controller.js';
import ordersController from '../../controllers/api/orders.controller.js';
import validateData from '../../schemas/index.validate.js';
import userSchema from '../../schemas/user.schema.js';
import ordersPostSchema from '../../schemas/orders.post.schema.js';
import authenticateToken from '../../helpers/jwt.verify.js';

const usersRouter = new express.Router();

usersRouter.route('/:id(\\d+)/orders')
  .get(controllerWrapper(authenticateToken('client')), controllerWrapper(ordersController.findOrdersListByUserPk))
  .post(controllerWrapper(authenticateToken('client')), validateData('body', ordersPostSchema), controllerWrapper(ordersController.createOneOrderByUserPk));

usersRouter.route('/:id(\\d+)')
  .get(controllerWrapper(authenticateToken('admin et client')), controllerWrapper(usersController.findByPk))
  .patch(controllerWrapper(authenticateToken('admin et client')), validateData('body', userSchema), controllerWrapper(usersController.updateOne));

usersRouter.route('/')
  .get(controllerWrapper(authenticateToken('admin')), controllerWrapper(usersController.findAll));

export default usersRouter;
