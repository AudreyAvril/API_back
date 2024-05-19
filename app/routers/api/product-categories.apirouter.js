import express from 'express';
import controllerWrapper from '../../helpers/controller.wrapper.js';
import productCategoriesController from '../../controllers/api/product-categories.controller.js';
import validateData from '../../schemas/index.validate.js';
import productCategoriesSchema from '../../schemas/productcategories.schema.js';
import authenticateToken from '../../helpers/jwt.verify.js';

const productCategoriesRouter = new express.Router();

productCategoriesRouter.route('/:id(\\d+)/products')
  .get(controllerWrapper(productCategoriesController.findProductsListFromOneCategory));

productCategoriesRouter.route('/:id(\\d+)')
  .get(controllerWrapper(authenticateToken('admin')), controllerWrapper(productCategoriesController.findByPk))
  .patch(controllerWrapper(authenticateToken('admin')), validateData('body', productCategoriesSchema), controllerWrapper(productCategoriesController.updateOne));

productCategoriesRouter.route('/')
  .get(controllerWrapper(productCategoriesController.findAll))
  .post(controllerWrapper(authenticateToken('admin')), validateData('body', productCategoriesSchema), controllerWrapper(productCategoriesController.createOne));

export default productCategoriesRouter;
