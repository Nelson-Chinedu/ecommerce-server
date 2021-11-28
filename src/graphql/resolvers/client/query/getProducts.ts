import { getRepository } from 'typeorm';
import winstonEnvLogger from 'winston-env-logger';
import { ForbiddenError } from 'apollo-server-errors';

import IContext from '../../../../interface/IContext';

import { Account, Product } from '../../../../db';

import { AccountType } from '../../../../db/entity/Account';

interface IArgs {
  take: number | undefined;
  skip: number | undefined;
}

const getProduct = async (
  _parent: unknown,
  args: IArgs,
  { user: { id } }: IContext
) => {
  try {
    const account = await Account.findOne({
      where: {
        id,
      },
    });
    if (!account || (account && account.accountType !== AccountType.MERCHANT)) {
      throw new ForbiddenError('Permission denied');
    } else if (
      account &&
      account.blocked &&
      account.accountType === AccountType.MERCHANT
    ) {
      throw new ForbiddenError('Account blocked, kindly contact support');
    }
    const products: Product[] | undefined = await getRepository(Product)
      .createQueryBuilder('product')
      .where('product.account = :product', {
        product: account.id,
      })
      .skip(args.skip)
      .take(args.take)
      .getMany();

    return { products };
  } catch (error) {
    winstonEnvLogger.error({
      error,
      message: 'An error occured',
    });
    throw error;
  }
};

export default getProduct;
