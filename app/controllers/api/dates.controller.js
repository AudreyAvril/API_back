import datesDatamapper from '../../datamappers/dates.datamapper.js';
import ApiError from '../../errors/api-error.js';

export default {
  async findAll(_, res) {
    const datesList = await datesDatamapper.findAll();
    return res.status(200).json(datesList);
  },

  async findByPk(req, res, next) {
    const date = await datesDatamapper.findByPk(req.params.id);

    // if date not exists
    if (!date) {
      const error = new ApiError('Resource not found', { httpStatus: 404 });
      return next(error);
    }

    // date exists
    return res.status(200).json(date);
  },

  async createOne(req, res) {
    const rowCount = await datesDatamapper.create(req.body);
    return res.status(200).json({ rowCount });
  },

  async updateOne(req, res, next) {
    const dateData = req.body;
    dateData.updated_at = new Date();
    const date = await datesDatamapper.update(req.params.id, dateData);

    // if date not exists
    if (!date) {
      const error = new ApiError('Resource not found', { httpStatus: 404 });
      return next(error);
    }

    // date exists
    return res.status(200).json({ date });
  },

  async deleteOne(req, res) {
    const rowCount = await datesDatamapper.delete(req.params.id);
    return res.status(200).json({ rowCount });
  },

};
