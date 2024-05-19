import ApiError from '../errors/api-error.js';

// This factory will return a custom middleware usable in the router
export default (source, schema) => async (req, res, next) => {
  try {
    // if source === 'query' => req['query'] => req.query
    await schema.validateAsync(req[source]);
    next();
  } catch (error) {
    // joi send error message in error.details[0].message and not in error.message
    next(new ApiError(error.details[0].message, { httpStatus: 400 }));
  }
};
