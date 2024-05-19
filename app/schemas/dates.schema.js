import Joi from 'joi';

export default Joi.object({
  id: Joi.number()
    .integer(),
  date: Joi.date()
    .required(),
  status: Joi.boolean(),
})
  .required();
