import winstonEnvLogger from 'winston-env-logger';
import { getConnection } from 'typeorm';
import { ForbiddenError } from 'apollo-server';

import { Account, Profile, Location, Store } from '../../../../db';

import IContext from '../../../../interface/IContext';
import { IUpdateProfileArgs } from '../../../../interface/IArgs';
import { AccountType } from '../../../../db/entity/Account';

const updateProfile = async (
  _parent: unknown,
  args: IUpdateProfileArgs,
  { user: { id } }: IContext
) => {
  try {
    const {
      firstname,
      lastname,
      phoneNumber,
      gender,
      city,
      country,
      address,
      storeName,
      currency,
    } = args;
    const account = await Account.findOne({
      where: {
        id,
      },
      relations: ['profile'],
    });

    if (!account) throw new ForbiddenError('Account does not exist');

    await getConnection()
      .createQueryBuilder()
      .update(Profile)
      .set({
        firstname,
        lastname,
        phoneNumber,
        gender,
        updatedAt: new Date().toLocaleString(),
      })
      .where('id = :id', { id: account.profile.id })
      .execute();

    await getConnection()
      .createQueryBuilder()
      .update(Location)
      .set({
        city,
        country,
        address,
        updatedAt: new Date().toLocaleString(),
      })
      .where('profileId = :id', { id: account.profile.id })
      .execute();

    if (
      account?.accountType === AccountType.MERCHANT &&
      (storeName || currency)
    ) {
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
    }

    return { message: 'Profile updated successfully', status: 200 };
  } catch (error) {
    winstonEnvLogger.error({
      message: 'An error occured',
      error,
    });
    throw error;
  }
};

export default updateProfile;
