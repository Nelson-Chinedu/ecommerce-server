import jwt from 'jsonwebtoken';

export const createToken = (
  payload: object | string,
  secret: string,
  expiresIn: string | number
): string => {
  return jwt.sign(payload, secret, { expiresIn });
};
