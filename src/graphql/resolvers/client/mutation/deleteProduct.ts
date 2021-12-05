import { getConnection, getRepository } from 'typeorm';
import { ForbiddenError } from 'apollo-server';
import winstonEnvLogger from 'winston-env-logger';
import { Account, Product } from '../../../../db';

import IContext from '../../../../interface/IContext';

import { checkAccount } from '../../../../utils/checkAccount';

const deleteProduct = async (
  _parent: unknown,
  args: { productNumber: number | string },
  { user: { id } }: IContext
) => {
  try {
    const { productNumber } = args;

    const account = await getRepository(Account).findOne({ where: { id } });

    const userAccount: string | undefined = checkAccount(account);

    if (userAccount) {
      throw new ForbiddenError(userAccount);
    }
    const product = await getRepository(Product).findOne({
      where: { number: productNumber, account: id },
    });
    if (!product) throw new ForbiddenError('Product not found');

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Product)
      .where('number = :number', { number: productNumber })
      .execute();

    return { message: 'Product deleted successfully' };
  } catch (error: any) {
    if (error.code === '23503') {
      throw new Error('Unable to delete, Product has one or more order');
    }
    winstonEnvLogger.error({
      message: 'An error occured',
      error,
    });
    throw error;
  }
};

export default deleteProduct;
