import Joi from 'joi';

export default Joi.object({
  id: Joi.number()
    .integer(),
  creator_id: Joi.number()
    .integer(),
  customer_id: Joi.number()
    .integer(),
  delivery_place_id: Joi.number()
    .integer(),
  delivery_date_id: Joi.number()
    .integer(),
  order_id: Joi.number()
    .integer(),
  bread_id: Joi.number()
    .integer(),
  quantity: Joi.number()
    .integer(),
  price: Joi.number(),
})
  .required();
