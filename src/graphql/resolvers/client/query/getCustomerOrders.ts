import winstonEnvLogger from 'winston-env-logger';
import { ForbiddenError } from 'apollo-server';
import { getRepository } from 'typeorm';

import { Account, Order } from '../../../../db';

import IContext from '../../../../interface/IContext';

const getCustomerOrders = async (
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

    if (!account) {
      throw new ForbiddenError('Permission denied');
    } else if (account && account.blocked) {
      throw new ForbiddenError('Account blocked, kindly contact support');
    }
    const orders: Order[] | undefined = await getRepository(Order)
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.product', 'product')
      .orderBy('order.createdAt', 'DESC')
      .where('order.customerId = :order', {
        order: account.id,
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

export default getCustomerOrders;
