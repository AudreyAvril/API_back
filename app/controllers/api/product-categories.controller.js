import productCategoriesDatamapper from '../../datamappers/product-categories.datamapper.js';
import ApiError from '../../errors/api-error.js';

export default {
  async findAll(_, res) {
    const productCategoriesList = await productCategoriesDatamapper.findAll();
    return res.status(200).json(productCategoriesList);
  },

  async findByPk(req, res, next) {
    const productCategory = await productCategoriesDatamapper.findByPk(req.params.id);

    // if productCategories not exists
    if (!productCategory) {
      const error = new ApiError('Resource not found', { httpStatus: 404 });
      return next(error);
    }

    // productCategories exists
    return res.status(200).json(productCategory);
  },

  async findProductsListFromOneCategory(req, res, next) {
    const productCategoriesList = await productCategoriesDatamapper
      .findProductsListFromOneCategory(req.params.id);

    // if productCategories not exists
    if (productCategoriesList.length < 1) {
      const error = new ApiError('Resource not found', { httpStatus: 404 });
      return next(error);
    }

    // productCategories exists
    return res.status(200).json(productCategoriesList);
  },

  async createOne(req, res) {
    const rowCount = await productCategoriesDatamapper.create(req.body);
    return res.status(200).json({ rowCount });
  },

  async updateOne(req, res, next) {
    const productCategoriesData = req.body;
    productCategoriesData.updated_at = new Date();
    const productCategory = await productCategoriesDatamapper
      .update(req.params.id, productCategoriesData);

    // if productCategories not exists
    if (!productCategory) {
      const error = new ApiError('Resource not found', { httpStatus: 404 });
      return next(error);
    }

    // productCategories exists
    return res.status(200).json({ productCategory });
  },

  async deleteOne(req, res) {
    const rowCount = await productCategoriesDatamapper.delete(req.params.id);
    return res.status(200).json({ rowCount });
  },

};
