import winstonEnvLogger from 'winston-env-logger';
import { ForbiddenError } from 'apollo-server';
import { getRepository } from 'typeorm';

import { Account, Order } from '../../../../db';

import IContext from '../../../../interface/IContext';

const previewOrder = async (
  _parent: unknown,
  args: { productId: string },
  { user: { id } }: IContext
) => {
  const { productId } = args;
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

    const order: Order | undefined = await Order.findOne({
      where: {
        orderId: productId,
      },
      relations: ['product'],
    });

    if (!order) return null;

    const { status, orderId, createdAt, product } = order;

    return { status, orderId, createdAt, product };
  } catch (error) {
    winstonEnvLogger.error({
      message: 'An error occured',
      error,
    });
    throw error;
  }
};

export default previewOrder;
