import { getRepository } from 'typeorm';
import winstonEnvLogger from 'winston-env-logger';
import { ForbiddenError } from 'apollo-server';

import IContext from '../../../../interface/IContext';

import { Account, Order } from '../../../../db';

import { checkAccount } from '../../../../utils/checkAccount';

const getTotalMerchantOrders = async (
  _parent: unknown,
  _args: unknown,
  { user: { id } }: IContext
) => {
  try {
    const account: Account | undefined = await Account.findOne({
      where: {
        id,
      },
    });

    const userAccount: string | undefined = checkAccount(account);

    if (userAccount) {
      throw new ForbiddenError(userAccount);
    }

    const orderCount = await getRepository(Order).count({
      where: { merchantId: id, status: 'delivered' },
    });

    return { count: orderCount };
  } catch (error) {
    winstonEnvLogger.error({
      error,
      message: 'An error occured',
    });
    throw error;
  }
};

export default getTotalMerchantOrders;
