import { getRepository } from 'typeorm';
import winstonEnvLogger from 'winston-env-logger';
import { ForbiddenError } from 'apollo-server';

import IContext from '../../../../interface/IContext';

import { Account, Product } from '../../../../db';

import { IPaginate } from '../../../../interface/IArgs';
import { checkAccount } from '../../../../utils/checkAccount';

const getProduct = async (
  _parent: unknown,
  args: IPaginate,
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

    const products: Product[] | undefined = await getRepository(Product)
      .createQueryBuilder('product')
      .orderBy('product.createdAt', 'DESC')
      .where('product.account = :product', {
        product: id,
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
