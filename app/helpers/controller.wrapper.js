import ApiError from '../errors/api-error.js';

// will run the controller and catch errors

export default (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    console.log(error);
    next(new ApiError(error.message, { httpStatus: 500 }));
  }
};
