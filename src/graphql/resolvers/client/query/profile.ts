import winstonEnvLogger from 'winston-env-logger';
import { ForbiddenError } from 'apollo-server';
import { Account } from '../../../../db';

interface IContext {
  user: {
    id: string;
  };
}

const Profile = async (
  _parent: unknown,
  _args: unknown,
  { user: { id } }: IContext
) => {
  try {
    const account = await Account.findOne({
      where: {
        id,
      },
      relations: ['profile'],
    });

    if (!account) throw new ForbiddenError('Account does not exist');

    const { email, profile } = account;

    return {
      email,
      profile,
    };
  } catch (error) {
    winstonEnvLogger.error({
      error,
      message: 'An error occured',
    });
  }
};

export default Profile;
