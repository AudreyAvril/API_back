import Joi from 'joi';

export default Joi.object({
  id: Joi.number()
    .integer(),
  weight: Joi.number()
    .integer()
    .required(),
  price: Joi.number()
    .required(),
  status: Joi.boolean()
    .required(),
  product_category_id: Joi.number()
    .integer()
    .required(),
})
  .required();
