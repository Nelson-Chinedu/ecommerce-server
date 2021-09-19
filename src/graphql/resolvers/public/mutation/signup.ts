import winstonEnvLogger from 'winston-env-logger';
import Joi from 'joi';
import { UserInputError } from 'apollo-server-express';

import { Account } from '../../../../db';
import { createToken } from '../../../../utils/token';

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ['com'] } })
    .required(),
  password: Joi.string().required(),
});

const signup = async (
  _parent: unknown,
  args: { email: string; password: string; accountType: string },
  _context: unknown
) => {
  const { email, password, accountType } = args;
  try {
    await schema.validateAsync({ email, password });

    const account = await Account.findOne({
      where: {
        email,
      },
    });
    if (account) {
      throw new UserInputError('Email address is invalid or already taken');
    }
    const newAccount = Account.create({
      email,
      password,
      accountType,
    });

    await newAccount.save();
    const token = createToken(
      { id: newAccount.id },
      process.env.JWT_KEY as string,
      '7d'
    );
    return { status: 201, message: 'Account successfully created', token };
  } catch (error: any) {
    winstonEnvLogger.error({
      message: 'An error occured',
      error,
    });
    throw error;
  }
};

export default signup;