import bcrypt from 'bcrypt';
import usersDatamapper from '../../datamappers/users.datamapper.js';
import ApiError from '../../errors/api-error.js';

export default {

  async findAll(_, res) {
    const usersList = await usersDatamapper.findAll();
    return res.status(200).json(usersList);
  },

  async findByPk(req, res, next) {
    const user = await usersDatamapper.findByPk(req.params.id);

    // if users not exists
    if (!user) {
      const error = new ApiError('Resource not found', { httpStatus: 404 });
      return next(error);
    }

    // user exists
    return res.status(200).json(user);
  },

  async createOne(req, res) {
    const rowCount = await usersDatamapper.create(req.body);
    return res.status(200).json({ rowCount });
  },

  async updateOne(req, res, next) {
    const userData = req.body;
    userData.updated_at = new Date();

    // create hash password and replace in userData.password
    const salt = await bcrypt.genSalt(10);
    const passwordEncrypted = await bcrypt.hash(userData.password, salt);
    userData.password = passwordEncrypted;

    const user = await usersDatamapper
      .update(req.params.id, userData);

    // if user not exists
    if (!user) {
      const error = new ApiError('Resource not found', { httpStatus: 404 });
      return next(error);
    }

    // user exists
    return res.status(200).json({ user });
  },

};
