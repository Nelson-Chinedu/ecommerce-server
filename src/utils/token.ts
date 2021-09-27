import jwt, { JwtPayload } from 'jsonwebtoken';

export const createToken = (
  payload: object | string,
  secret: string,
  expiresIn: string | number
): string => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token: string): string | JwtPayload => {
  return jwt.verify(token, process.env.JWT_KEY as string);
};
