import express from 'express';
import controllerWrapper from '../../helpers/controller.wrapper.js';
import placeshasdatesController from '../../controllers/api/placeshasdates.controller.js';
import validateData from '../../schemas/index.validate.js';
import placeshasdatesSchema from '../../schemas/placeshasdates.schema.js';
import authenticateToken from '../../helpers/jwt.verify.js';

const dateRouter = new express.Router();

dateRouter.route('/:id(\\d+)')
  .get(controllerWrapper(authenticateToken('admin')), controllerWrapper(placeshasdatesController.findByPk))
  .patch(controllerWrapper(authenticateToken('admin')), validateData('body', placeshasdatesSchema), controllerWrapper(placeshasdatesController.updateOne));

dateRouter.route('/')
  .get(controllerWrapper(authenticateToken('admin')), controllerWrapper(placeshasdatesController.findAll))
  .post(controllerWrapper(authenticateToken('admin')), validateData('body', placeshasdatesSchema), controllerWrapper(placeshasdatesController.createOne));

export default dateRouter;
