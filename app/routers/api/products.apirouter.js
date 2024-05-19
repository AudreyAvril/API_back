import express from 'express';
import controllerWrapper from '../../helpers/controller.wrapper.js';
import productsController from '../../controllers/api/products.controller.js';
import validateData from '../../schemas/index.validate.js';
import productsSchema from '../../schemas/products.schema.js';
import authenticateToken from '../../helpers/jwt.verify.js';

const productsRouter = new express.Router();

productsRouter.route('/:id(\\d+)')
  .get(controllerWrapper(authenticateToken('admin')), controllerWrapper(productsController.findByPk))
  .patch(controllerWrapper(authenticateToken('admin')), validateData('body', productsSchema), controllerWrapper(productsController.updateOne));

productsRouter.route('/')
  .get(controllerWrapper(authenticateToken('admin et client')), controllerWrapper(productsController.findAll))
  .post(controllerWrapper(authenticateToken('admin')), validateData('body', productsSchema), controllerWrapper(productsController.createOne));

export default productsRouter;
