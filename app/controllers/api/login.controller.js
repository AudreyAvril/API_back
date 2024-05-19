// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';
import emailValidator from 'email-validator';
import bcrypt from 'bcrypt';
import userDatamapper from '../../datamappers/users.datamapper.js';

export default {

  async loginAction(req, res) {
    // check that it is an email format
    if (!emailValidator.validate(req.body.email)) {
      return res.status(400).json({
        error: 'invalid email or password',
      });
    }

    // recover the user
    const user = await userDatamapper.findOneEmail(req.body.email);

    // if user exists, check the password
    if (user) {
      const isValidPassword = await bcrypt.compare(req.body.password, user.password);

      // If password is invalid
      if (!isValidPassword) {
        return res.status(401).json({
          error: 'invalid email or password',
        });
      }

    // if user doesn't exist
    } else {
      return res.status(401).json({
        error: 'invalid email or password',
      });
    }

    // All is ok, access is possible
    // delete user.password
    const { password: dontKeep, ...dataUser } = user;

    // Create a token
    const token = jwt.sign({ dataUser }, process.env.JWT_PRIVATE_KEY);
    return res.status(200).json({ token });
  },
};
