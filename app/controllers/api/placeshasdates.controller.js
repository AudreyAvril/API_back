import placesHasDatesDatamapper from '../../datamappers/placeshasdates.datamapper.js';
import ApiError from '../../errors/api-error.js';

export default {
  async findAll(_, res) {
    const datesAndPlacesList = await placesHasDatesDatamapper.findAll();
    return res.status(200).json(datesAndPlacesList);
  },

  async findByPk(req, res, next) {
    const placehasdate = await placesHasDatesDatamapper.findByPk(req.params.id);

    // if placehasdate not exists
    if (!placehasdate) {
      const error = new ApiError('Resource not found', { httpStatus: 404 });
      return next(error);
    }

    // if placehasdate exists
    return res.status(200).json(placehasdate);
  },

  async createOne(req, res) {
    const datesAndPlacesdata = req.body;
    const rowCount = await placesHasDatesDatamapper.create(datesAndPlacesdata);
    return res.status(200).json({ rowCount });
  },

  async updateOne(req, res, next) {
    const datesAndPlacesdata = req.body;
    datesAndPlacesdata.updated_at = new Date();
    const placehasdate = await placesHasDatesDatamapper.update(req.params.id, datesAndPlacesdata);

    // if placehasdate not exists
    if (!placehasdate) {
      const error = new ApiError('Resource not found', { httpStatus: 404 });
      return next(error);
    }

    // if placehasdate exists
    return res.status(200).json({ placehasdate });
  },

};
