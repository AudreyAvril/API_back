import express from 'express';
import apiRouter from './api/index.apirouter.js';
import indexController from '../controllers/api/index.controller.js';

const router = new express.Router();

router.use('/api', apiRouter);

// page 404
router.use(indexController.notFound);

export default router;
