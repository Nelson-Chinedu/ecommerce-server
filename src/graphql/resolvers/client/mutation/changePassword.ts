import winstonEnvLogger from 'winston-env-logger';
import { UserInputError, ForbiddenError } from 'apollo-server';
import { getConnection } from 'typeorm';

import { Account } from '../../../../db';

import { hashPassword, isValidPassword } from '../../../../utils/passwordOp';

import IContext from '../../../../interface/IContext';
import { IChangePasswordArgs } from '../../../../interface/IArgs';

const changePassword = async (
  _parent: unknown,
  args: IChangePasswordArgs,
  { user: { id } }: IContext
) => {
  const { currentPassword, newPassword, confirmPassword } = args;
  try {
    if (currentPassword && !newPassword && !confirmPassword) {
      throw new UserInputError('All fields are required');
    }
    const account: Account | undefined = await Account.findOne({
      where: {
        id,
      },
    });
    if (
      !account ||
      (account && !(await isValidPassword(currentPassword, account.password)))
    ) {
      throw new ForbiddenError('Permission denied');
    } else if (newPassword !== confirmPassword) {
      throw new UserInputError('Password do not match');
    }

    const userPassword: string = await hashPassword(confirmPassword);

    await getConnection()
      .createQueryBuilder()
      .update(Account)
      .set({
        password: userPassword,
        updatedAt: new Date().toLocaleString(),
      })
      .where('id = :id', { id })
      .execute();
    return { message: 'Password updated successfully' };
  } catch (error) {
    winstonEnvLogger.error({
      message: 'An error occured',
      error,
    });
    throw error;
  }
};

export default changePassword;
