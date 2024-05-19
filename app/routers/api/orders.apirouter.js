import express from 'express';
import ordersController from '../../controllers/api/orders.controller.js';
import controllerWrapper from '../../helpers/controller.wrapper.js';
import authenticateToken from '../../helpers/jwt.verify.js';
import validateData from '../../schemas/index.validate.js';
import orderSchema from '../../schemas/orders.schema.js';

const ordersRouter = new express.Router();

ordersRouter.route('/:id(\\d+)')

  .get(controllerWrapper(authenticateToken('admin')), controllerWrapper(ordersController.findByPk))
  .patch(controllerWrapper(authenticateToken('admin et client')), validateData('body', orderSchema), controllerWrapper(ordersController.updateOne))
  .delete(controllerWrapper(authenticateToken('admin et client')), controllerWrapper(ordersController.deleteOne));

ordersRouter.route('/')
  .get(controllerWrapper(authenticateToken('admin')), controllerWrapper(ordersController.findAll));

export default ordersRouter;
