import winstonEnvLogger from 'winston-env-logger';
import { getConnection } from 'typeorm';
import { ForbiddenError } from 'apollo-server';

import { Account, Profile } from '../../../../db';

import IContext from '../../../../interface/IContext';
import { IUpdateProfileArgs } from '../../../../interface/IArgs';

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
      region,
      city,
      country,
      address,
      imageUrl,
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
        region,
        city,
        country,
        address,
        imageUrl,
        account,
        updatedAt: new Date().toLocaleString(),
      })
      .where('id = :id', { id: account.profile.id })
      .execute();
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
