import { getConnection, getRepository } from 'typeorm';
import { ForbiddenError } from 'apollo-server';
import winstonEnvLogger from 'winston-env-logger';

import IContext from '../../../../interface/IContext';

import { Account, Order } from '../../../../db';

import { checkAccount } from '../../../../utils/checkAccount';

const updateOrderStatus = async (
  _parent: unknown,
  args: { orderNumber: string; status: any },
  { user: { id } }: IContext
) => {
  const { orderNumber, status } = args;
  console.log(id);
  try {
    const account = await getRepository(Account).findOne({ where: { id } });

    const userAccount: string | undefined = checkAccount(account);

    if (userAccount) {
      throw new ForbiddenError(userAccount);
    }

    const order = await getRepository(Order).findOne({
      where: { merchantId: id, orderId: orderNumber },
    });

    if (!order) throw new Error('Order not found');
    console.log(status);

    await getConnection()
      .createQueryBuilder()
      .update(Order)
      .set({ status })
      .where('orderId = :orderId', { orderId: orderNumber })
      .execute();

    return { message: 'Order status updated successfully' };
  } catch (error) {
    winstonEnvLogger.error({
      message: 'An error occured',
      error,
    });
    throw error;
  }
};

export default updateOrderStatus;
