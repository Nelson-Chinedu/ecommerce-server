import winstonEnvLogger from 'winston-env-logger';
import { ForbiddenError } from 'apollo-server';

import { verifyEmailToken } from '../../../../utils/token';
import { Account } from '../../../../db';
import { getConnection } from 'typeorm';

const verifyEmail = async (
  _parent: unknown,
  args: { token: string },
  _context: unknown
) => {
  const { token } = args;
  try {
    if (!token) throw new ForbiddenError('Something went wrong');
    const verifiedToken: any = verifyEmailToken(token);
    if (verifiedToken) {
      const { id } = verifiedToken;
      const account = await Account.findOne({
        where: {
          id,
        },
      });
      if (!account) throw new ForbiddenError('Something went wrong');
      if (account && account.verified) {
        return { message: 'Email already verified, Proceed to login' };
      }
      await getConnection()
        .createQueryBuilder()
        .update(Account)
        .set({ verified: true })
        .where('id = :id', { id })
        .execute();

      return {
        message: 'Email verification successful, Please proceed to login',
      };
    }
  } catch (error) {
    winstonEnvLogger.error({
      message: 'An error occured',
      error,
    });
    throw error;
  }
};

export default verifyEmail;
