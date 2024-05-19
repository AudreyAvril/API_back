import ApiError from '../../errors/api-error.js';

export default {
  async notFound(_, __, next) {
    const err = new ApiError('Resource not found', { httpStatus: 404 });
    next(err);
  },

};
