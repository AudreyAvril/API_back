import Joi from 'joi';

export default Joi.object({
  id: Joi.number()
    .integer(),
  delivery_date_id: Joi.number()
    .integer()
    .required(),
  delivery_place_id: Joi.number()
    .integer()
    .required(),
})
  .required();
