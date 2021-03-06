import winstonEnvLogger from 'winston-env-logger';
import { ForbiddenError } from 'apollo-server';
import { getRepository } from 'typeorm';

import { Account, Order } from '../../../../db';

import IContext from '../../../../interface/IContext';
import { checkAccount } from '../../../../utils/checkAccount';

const getMerchantOrders = async (
  _parent: unknown,
  _args: unknown,
  { user: { id } }: IContext
) => {
  try {
    const account: Account | undefined = await getRepository(Account).findOne({
      where: {
        id,
      },
    });

    const userAccount: string | undefined = checkAccount(account);

    if (userAccount) {
      throw new ForbiddenError(userAccount);
    }

    const orders: Order[] | undefined = await getRepository(Order)
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.product', 'product')
      .leftJoinAndSelect('order.account', 'account')
      .orderBy('order.createdAt', 'DESC')
      .where('order.merchantId = :order', {
        order: id,
      })
      .getMany();

    return { orders };
  } catch (error) {
    winstonEnvLogger.error({
      message: 'An error occured',
      error,
    });
    throw error;
  }
};

export default getMerchantOrders;
