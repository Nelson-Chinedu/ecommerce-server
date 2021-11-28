import winstonEnvLogger from 'winston-env-logger';
import Joi from 'joi';
import { UserInputError } from 'apollo-server-express';

import { Account, Profile, Location, Store } from '../../../../db';
import { createToken } from '../../../../utils/token';
import { AccountType } from '../../../../db/entity/Account';

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ['com'] } })
    .required(),
  password: Joi.string().required(),
});

const signup = async (
  _parent: unknown,
  args: { email: string; password: string; accountType: AccountType },
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
    const newAccount: Account = Account.create({
      email,
      password,
      accountType,
    });
    await newAccount.save();

    const newProfile: Profile = Profile.create({
      firstname: '',
      lastname: '',
      phoneNumber: '',
      gender: '',
      imageUrl: '',
      account: newAccount,
    });
    await newProfile.save();

    if (newAccount.accountType === AccountType.MERCHANT) {
      const newStore = Store.create({
        name: '',
        currency: '',
        profile: newProfile,
      });
      await newStore.save();
    }

    const newLocation: Location = Location.create({
      city: '',
      country: '',
      address: '',
      profile: newProfile,
    });
    await newLocation.save();

    const token: string = createToken(
      { id: newAccount.id },
      process.env.JWT_KEY as string,
      '7d'
    );
    return {
      status: 201,
      message: 'Account successfully created',
      token,
      accountType,
    };
  } catch (error: any) {
    winstonEnvLogger.error({
      message: 'An error occured',
      error,
    });
    throw error;
  }
};

export default signup;
