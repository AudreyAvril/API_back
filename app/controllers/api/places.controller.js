import placesDatamapper from '../../datamappers/places.datamapper.js';
import ApiError from '../../errors/api-error.js';

export default {
  async findAll(_, res) {
    const placesList = await placesDatamapper.findAll();
    return res.status(200).json(placesList);
  },

  async findDatesListByPlaces(_, res) {
    const placesList = await placesDatamapper.findAllDatesByPlaces();
    return res.status(200).json(placesList);
  },

  async findByPk(req, res, next) {
    const place = await placesDatamapper.findByPk(req.params.id);

    // if place not exists
    if (!place) {
      const error = new ApiError('Resource not found', { httpStatus: 404 });
      return next(error);
    }

    // place exists
    return res.status(200).json(place);
  },

  async createOne(req, res) {
    const rowCount = await placesDatamapper.create(req.body);
    return res.status(200).json({ rowCount });
  },

  async updateOne(req, res, next) {
    const placeData = req.body;
    placeData.updated_at = new Date();
    const place = await placesDatamapper
      .update(req.params.id, placeData);

    // if place not exists
    if (!place) {
      const error = new ApiError('Resource not found', { httpStatus: 404 });
      return next(error);
    }

    // place exists
    return res.status(200).json({ place });
  },

};
