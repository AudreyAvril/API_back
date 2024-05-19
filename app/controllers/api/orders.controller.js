import ordersDatamapper from '../../datamappers/orders.datamapper.js';
import ApiError from '../../errors/api-error.js';
import usersDatamapper from '../../datamappers/users.datamapper.js';

export default {
  async findAll(_, res) {
    const ordersList = await ordersDatamapper.findAll();
    return res.status(200).json(ordersList);
  },

  async findByPk(req, res, next) {
    const order = await ordersDatamapper.findByPk(req.params.id);

    // if order not exists
    if (!order) {
      const error = new ApiError('Resource not found', { httpStatus: 404 });
      return next(error);
    }
    // order exists
    return res.status(200).json(order);
  },

  async findOrdersListByUserPk(req, res, next) {
    const { id } = req.params;
    // check user exists
    const user = await usersDatamapper.findByPk(id);

    // if users not exists
    if (!user) {
      const error = new ApiError('Resource not found', { httpStatus: 404 });
      return next(error);
    }

    // user exists : find orders list
    const ordersList = await ordersDatamapper.findOrdersListByUserPk(id);

    return res.status(200).json(ordersList);
  },

  async createOneOrderByUserPk(req, res, next) {
    const userId = req.params.id;
    // check user exists
    const user = await usersDatamapper.findByPk(userId);

    // if user not exists
    if (!user) {
      const error = new ApiError('Resource not found', { httpStatus: 404 });
      return next(error);
    }

    // user exist, create in order relation
    const orderId = await ordersDatamapper.create(req.body);
    const { id } = orderId;

    // and create in product_has_order relation
    const rowCount = await ordersDatamapper.createProductHasOrder(id, req.body);

    return res.status(200).json({ rowCount });
  },

  async createOne(req, res) {
    const rowCount = await ordersDatamapper.create(req.body);
    return res.status(200).json({ rowCount });
  },

  async updateOne(req, res, next) {
    const orderData = req.body;
    orderData.updated_at = new Date();
    const order = await ordersDatamapper
      .updateOrder(req.params.id, orderData);

    // if order not exists
    if (!order) {
      const error = new ApiError('Resource not found', { httpStatus: 404 });
      return next(error);
    }

    // order exists
    const productHasOrder = await ordersDatamapper.updateProductHasOrder(req.params.id, orderData);

    // if productHasOrder not exists
    if (!productHasOrder) {
      const error = new ApiError('Resource not found', { httpStatus: 404 });
      return next(error);
    }

    // productHasOrder exists
    return res.status(200).json({ order, productHasOrder });
  },

  async deleteOne(req, res) {
    const rowCount = await ordersDatamapper.delete(req.params.id);
    return res.status(200).json({ rowCount });
  },

};
