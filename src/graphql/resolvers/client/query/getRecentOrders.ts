import { ForbiddenError } from 'apollo-server';
import { getRepository } from 'typeorm';
import winstonEnvLogger from 'winston-env-logger';

import { Account, Order } from '../../../../db';

import { IPaginate } from '../../../../interface/IArgs';
import IContext from '../../../../interface/IContext';

import { checkAccount } from '../../../../utils/checkAccount';

const getRecentOrders = async (
  _parent: unknown,
  args: IPaginate,
  { user: { id } }: IContext
) => {
  try {
    const account: Account | undefined = await getRepository(Account).findOne({
      where: { id },
    });

    const userAccount: string | undefined = checkAccount(account);

    if (userAccount) {
      throw new ForbiddenError(userAccount);
    }

    const orders: Order[] = await getRepository(Order)
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.product', 'product')
      .leftJoinAndSelect('order.account', 'account')
      .orderBy('order.createdAt', 'DESC')
      .where('order.merchantId = :order', {
        order: id,
      })
      .skip(args.skip)
      .take(args.take)
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

export default getRecentOrders;
