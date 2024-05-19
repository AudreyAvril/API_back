import Joi from 'joi';

export default Joi.object({
  id: Joi.number()
    .integer(),
  delivery_date_id: Joi.date()
    .required(),
  delivery_place_id: Joi.number()
    .integer()
    .required(),
  bread_id: Joi.number()
    .integer()
    .required(),
  quantity: Joi.number()
    .integer()
    .required(),
  creator_id: Joi.number()
    .integer()
    .required(),
  customer_id: Joi.number()
    .integer()
    .required(),
  price: Joi.number()
    .required(),
})
  .required();
