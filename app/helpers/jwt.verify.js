import jwt from 'jsonwebtoken';
import userDatamapper from '../datamappers/users.datamapper.js';

// eslint-disable-next-line consistent-return
export default (role) => async (req, res, next) => {
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Extract the JWT token from the authorization header
  const token = authHeader.split(' ')[1];

  // Verify the JWT token with the secret key
  const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

  // Get the user id from the decoded token and find the user in database
  const { id } = decodedToken.dataUser;
  const user = await userDatamapper.findByPk(id);

  // If user not exists
  if (!user) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  // if admin and client are not both authorized
  if (role !== 'admin et client') {
    // if user's role !== role from the router  => unauthorized
    if (user.role !== role) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
  }

  next();
};
