import express from 'express';
import controllerWrapper from '../../helpers/controller.wrapper.js';
import loginController from '../../controllers/api/login.controller.js';
import signupController from '../../controllers/api/signup.controller.js';
import usersRouter from './users.apirouter.js';

import validateData from '../../schemas/index.validate.js';
import signupSchema from '../../schemas/signup.schema.js';
import loginSchema from '../../schemas/login.schema.js';

import productCategoriesRouter from './product-categories.apirouter.js';
import ordersRouter from './orders.apirouter.js';
import datesRouter from './dates.apirouter.js';
import placesRouter from './places.apirouter.js';
import productsRouter from './products.apirouter.js';
import placesHasDatesRouter from './placeshasdates.apirouter.js';

const apiRouter = new express.Router();

apiRouter.route('/login')
  .post(validateData('body', loginSchema), controllerWrapper(loginController.loginAction));

apiRouter.route('/signup')
  .post(validateData('body', signupSchema), controllerWrapper(signupController.signupAction));

apiRouter.use('/users', usersRouter);
apiRouter.use('/product-categories', productCategoriesRouter);
apiRouter.use('/orders', ordersRouter);
apiRouter.use('/dates', datesRouter);
apiRouter.use('/places', placesRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/placeshasdates', placesHasDatesRouter);

export default apiRouter;
