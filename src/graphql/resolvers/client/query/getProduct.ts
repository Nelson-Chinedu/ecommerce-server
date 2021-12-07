import { getRepository } from 'typeorm';
import { ForbiddenError } from 'apollo-server';
import winstonEnvLogger from 'winston-env-logger';

import { Account, Product } from '../../../../db';

import IContext from '../../../../interface/IContext';

import { checkAccount } from '../../../../utils/checkAccount';

interface IArgs {
  productNumber: number | string;
}

const getProduct = async (
  _parent: unknown,
  { productNumber }: IArgs,
  { user: { id } }: IContext
) => {
  try {
    const account = await getRepository(Account).findOne({ where: { id } });

    const userAccount: string | undefined = checkAccount(account);

    if (userAccount) {
      throw new ForbiddenError(userAccount);
    }

    const product: Product | undefined = await getRepository(Product).findOne({
      where: { account: id, number: productNumber },
    });

    if (!product) throw new Error('Product not found');

    const {
      id: productId,
      number,
      name,
      description,
      sizes,
      colors,
      category,
      stock,
      tags,
      oldPrice,
      newPrice,
      imageUrl,
    } = product;

    return {
      productId,
      number,
      name,
      description,
      sizes,
      colors,
      category,
      stock,
      tags,
      oldPrice,
      newPrice,
      imageUrl,
      account,
    };
  } catch (error) {
    winstonEnvLogger.error({
      message: 'An error occured',
      error,
    });
    throw error;
  }
};

export default getProduct;
