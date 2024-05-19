import emailValidator from 'email-validator';
import bcrypt from 'bcrypt';
import userDatamapper from '../../datamappers/users.datamapper.js';

export default {

  async signupAction(req, res) {
    const { password, email } = req.body;
    const user = req.body;

    // check that it is an email format
    if (!emailValidator.validate(email)) {
      return res.status(400).json({
        error: 'invalid email',
      });
    }

    // check if email exist
    const userInTable = await userDatamapper.findOneEmail(email);

    // if exist = error
    if (userInTable) {
      return res.status(401).json({ error: 'This email is already registered in the database' });
    }

    // create hash password and replace in user.password
    const salt = await bcrypt.genSalt(12);
    const passwordEncrypted = await bcrypt.hash(password, salt);

    user.password = passwordEncrypted;
    delete user.passwordConfirm;

    // create user in database
    const rowCount = await userDatamapper.create(user);
    return res.status(200).json({ rowCount });
  },
};
