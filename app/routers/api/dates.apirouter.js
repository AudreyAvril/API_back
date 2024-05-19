import express from 'express';
import controllerWrapper from '../../helpers/controller.wrapper.js';
import datesController from '../../controllers/api/dates.controller.js';
import validateData from '../../schemas/index.validate.js';
import dateSchema from '../../schemas/dates.schema.js';
import authenticateToken from '../../helpers/jwt.verify.js';

const dateRouter = new express.Router();

dateRouter.route('/:id(\\d+)')

  .get(controllerWrapper(authenticateToken('admin')), controllerWrapper(datesController.findByPk))
  .patch(controllerWrapper(authenticateToken('admin')), validateData('body', dateSchema), controllerWrapper(datesController.updateOne));

dateRouter.route('/')
  .get(controllerWrapper(authenticateToken('admin et client')), controllerWrapper(datesController.findAll))
  .post(controllerWrapper(authenticateToken('admin')), validateData('body', dateSchema), controllerWrapper(datesController.createOne));

export default dateRouter;
