import jwt from 'jsonwebtoken';
import { AppError } from '../utils/errorHandler.js';

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      throw new AppError('No authentication token, access denied', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    next(new AppError('Authentication failed', 401));
  }
};

export default auth;