import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies?.token ||
      req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (token === undefined) {
      return res
        .status(403)
        .json(new ApiError(403, 'Unauthorized user', 'No token provided'));
    }
    const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    if (!decodeToken) {
      return res
        .status(403)
        .json(new ApiError(403, 'Invalid token', 'Token is malformed'));
    }
    const user = await User.findById(decodeToken?.id).select('-password');
    if (!user) {
      return res
        .status(404)
        .json(new ApiError(404, 'User not found', 'User not found'));
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res
        .status(403)
        .json(new ApiError(403, 'Invalid token', 'Token is invalid'));
    }

    res
      .status(500)
      .json(new ApiError(500, 'Internal Server Error', error.message));
  }
};
