import productsDatamapper from '../../datamappers/products.datamapper.js';
import ApiError from '../../errors/api-error.js';

export default {
  async findAll(_, res) {
    const productsList = await productsDatamapper.findAll();
    return res.status(200).json(productsList);
  },

  async findByPk(req, res, next) {
    const product = await productsDatamapper.findByPk(req.params.id);

    // if product not exists
    if (!product) {
      const error = new ApiError('Resource not found', { httpStatus: 404 });
      return next(error);
    }

    // product exists
    return res.status(200).json(product);
  },

  async createOne(req, res) {
    const rowCount = await productsDatamapper.create(req.body);
    return res.status(200).json({ rowCount });
  },

  async updateOne(req, res, next) {
    const productsData = req.body;
    productsData.updated_at = new Date();
    const product = await productsDatamapper
      .update(req.params.id, productsData);

    // if product not exists
    if (!product) {
      const error = new ApiError('Resource not found', { httpStatus: 404 });
      return next(error);
    }

    // product exists
    return res.status(200).json({ product });
  },

};
