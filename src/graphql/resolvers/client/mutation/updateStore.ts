import winstonEnvLogger from 'winston-env-logger';
import { getConnection } from 'typeorm';
import { ForbiddenError } from 'apollo-server';

import { Account, Store } from '../../../../db';

import IContext from '../../../../interface/IContext';
import { IUpdateSettingArgs } from '../../../../interface/IArgs';

import { AccountType } from '../../../../db/entity/Account';

const updateProfile = async (
  _parent: unknown,
  args: IUpdateSettingArgs,
  { user: { id } }: IContext
) => {
  try {
    const { storeName, currency } = args;
    const account = await Account.findOne({
      where: {
        id,
      },
      relations: ['profile'],
    });

    if (!account) throw new ForbiddenError('Account does not exist');

    if (account.accountType !== AccountType.MERCHANT) {
      throw new ForbiddenError('No store created');
    }

    await getConnection()
      .createQueryBuilder()
      .update(Store)
      .set({
        currency,
        name: storeName,
        updatedAt: new Date().toLocaleString(),
      })
      .where('profileId = :id', { id: account.profile.id })
      .execute();

    return { message: 'Store updated successfully', status: 200 };
  } catch (error) {
    winstonEnvLogger.error({
      message: 'An error occured',
      error,
    });
    throw error;
  }
};

export default updateProfile;
