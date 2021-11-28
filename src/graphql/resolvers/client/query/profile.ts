import winstonEnvLogger from 'winston-env-logger';
import { ForbiddenError } from 'apollo-server';
import { getRepository } from 'typeorm';

import { Profile as UserProfile } from '../../../../db';

import IContext from '../../../../interface/IContext';

const Profile = async (
  _parent: unknown,
  _args: unknown,
  { user: { id } }: IContext
) => {
  try {
    const user: UserProfile[] | undefined = await getRepository(
      UserProfile
    ).find({
      relations: ['store', 'location'],
      where: { account: id },
    });

    if (!user) throw new ForbiddenError('Account does not exist');

    const {
      firstname,
      lastname,
      phoneNumber,
      gender,
      imageUrl,
      store,
      location,
      account,
    } = user[0];

    return {
      firstname,
      lastname,
      phoneNumber,
      gender,
      imageUrl,
      store,
      location,
      account,
    };
  } catch (error) {
    winstonEnvLogger.error({
      error,
      message: 'An error occured',
    });
    throw error;
  }
};

export default Profile;
