import winstonEnvLogger from 'winston-env-logger';
import { getConnection, getRepository } from 'typeorm';
import { ForbiddenError } from 'apollo-server';

import { Account, Order } from '../../../../db';

import IContext from '../../../../interface/IContext';

import { AccountType } from '../../../../db/entity/Account';

const cancelOrder = async (
  _parent: unknown,
  args: { orderNumber: string },
  { user: { id } }: IContext
) => {
  const { orderNumber } = args;
  try {
    const account = await getRepository(Account).findOne({ where: { id } });
    if (!account) throw new ForbiddenError('Account does not exist');

    if (account.accountType !== AccountType.CUSTOMER) {
      throw new ForbiddenError('Permission denied');
    }

    const order = await getRepository(Order).findOne({
      where: { orderId: orderNumber },
    });

    if (!order) {
      throw new Error('Order not found');
    } else if (order.status !== 'processing') {
      throw new Error('Unable to cancel order');
    }

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Order)
      .where('orderId = :orderId', { orderId: orderNumber })
      .execute();

    return { message: 'Order cancelled successfully' };
  } catch (error) {
    winstonEnvLogger.error({
      message: 'An error occured',
      error,
    });
    throw error;
  }
};

export default cancelOrder;
