import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface ExtendedRequest extends Request {
  user?: { id: number };
}

const verifyToken = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ error: 'Falha na autenticação. Tente novamente mais tarde' });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res
      .status(500)
      .json({ error: 'Falha na autenticação. Tente novamente mais tarde' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ error: 'Falha na autenticação. Tente novamente mais tarde' });
    }

    req.user = decoded;
    next();
  });
};

export default verifyToken;
