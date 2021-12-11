import winstonEnvLogger from 'winston-env-logger';
import Joi from 'joi';
import { UserInputError, ForbiddenError } from 'apollo-server-express';
import { Account } from '../../../../db';
import { isValidPassword } from '../../../../utils/passwordOp';
import { createToken } from '../../../../utils/token';

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ['com'] } })
    .required(),
  password: Joi.string().required(),
});

const signin = async (
  _parent: unknown,
  args: { email: string; password: string },
  _context: unknown
) => {
  const { email, password } = args;

  try {
    await schema.validateAsync({ email, password });

    const account: Account | undefined = await Account.findOne({
      where: {
        email,
      },
    });
    if (
      !account ||
      (account && !(await isValidPassword(password, account.password)))
    ) {
      throw new UserInputError('Incorrect email or password');
    }
    if (account && account.blocked) {
      throw new ForbiddenError('Account blocked, kindly contact support');
    }

    const token: string = createToken(
      { id: account.id },
      process.env.JWT_KEY as string,
      '1d'
    );
    return {
      token,
      isLoggedin: true,
      status: 200,
      message: 'Logged in successfully',
      accountType: account.accountType,
    };
  } catch (error: any) {
    if (error.message === '"email" must be a valid email') {
      throw new UserInputError(error.message);
    }
    winstonEnvLogger.error({
      message: 'An error occured',
      error,
    });
    throw error;
  }
};

export default signin;
