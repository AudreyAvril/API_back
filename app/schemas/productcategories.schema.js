import Joi from 'joi';

export default Joi.object({
  id: Joi.number()
    .integer(),
  name: Joi.string()
    .required(),
  description: Joi.string()
    .required(),
  photo: Joi.string()
    .required(),
  status: Joi.boolean()
    .required(),
})
  .required();
