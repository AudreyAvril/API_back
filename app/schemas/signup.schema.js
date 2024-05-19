import Joi from 'joi';

const phone = /^0[1-9][0-9]{8}$/;
const zipCode = /^0[1-9]\d{3}$|^[1-8]\d{4}$|^9[0-59]\d{3}$|^97[1-8]\d{2}$|^98[046-9]\d{2}$|^00000$/;
const password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/;

export default Joi.object({
  first_name: Joi.string()
    .required(),
  last_name: Joi.string()
    .required(),
  phone: Joi.string()
    .pattern(phone)
    .required(),
  adress: Joi.string()
    .required(),
  zip_code: Joi.string()
    .pattern(zipCode)
    .required(),
  city: Joi.string()
    .required(),
  status: Joi.boolean(),
  role: Joi.string(),
  agreement: Joi.boolean(),
  email: Joi.string()
    .required(),
  password: Joi.string()
    .pattern(password)
    .required(),
  passwordConfirm: Joi.ref('password'),
})
  .required()
  .min(9);
