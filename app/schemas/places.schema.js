import Joi from 'joi';

export default Joi.object({
  id: Joi.number()
    .integer(),
  name: Joi.string()
    .required(),
  adress: Joi.string()
    .required(),
  zip_code: Joi.string()
    .required(),
  city: Joi.string()
    .required(),
  information: Joi.string()
    .required(),
  status: Joi.boolean()
    .required(),
})
  .required();
