import express from 'express';
import controllerWrapper from '../../helpers/controller.wrapper.js';
import placesController from '../../controllers/api/places.controller.js';
import validateData from '../../schemas/index.validate.js';
import placesSchema from '../../schemas/places.schema.js';
import authenticateToken from '../../helpers/jwt.verify.js';

const placesRouter = new express.Router();

placesRouter.route('/dates')
  .get(controllerWrapper(authenticateToken('client')), controllerWrapper(placesController.findDatesListByPlaces));

placesRouter.route('/:id(\\d+)')
  .get(controllerWrapper(authenticateToken('admin')), controllerWrapper(placesController.findByPk))
  .patch(controllerWrapper(authenticateToken('admin')), validateData('body', placesSchema), controllerWrapper(placesController.updateOne));

placesRouter.route('/')
  .get(controllerWrapper(authenticateToken('admin et client')), controllerWrapper(placesController.findAll))
  .post(controllerWrapper(authenticateToken('admin')), validateData('body', placesSchema), controllerWrapper(placesController.createOne));

export default placesRouter;
