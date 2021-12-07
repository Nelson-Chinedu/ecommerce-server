import winstonEnvLogger from 'winston-env-logger';
import { ForbiddenError, UserInputError } from 'apollo-server';

import { Account, Product } from '../../../../db';

import IContext from '../../../../interface/IContext';
import { IProduct } from '../../../../interface/IArgs';

import { getConnection, getRepository } from 'typeorm';

import { checkAccount } from '../../../../utils/checkAccount';

const editProduct = async (
  _parent: unknown,
  args: IProduct,
  { user: { id } }: IContext
) => {
  const {
    productNumber,
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
  } = args;
  try {
    const account = await getRepository(Account).findOne({ where: { id } });

    const userAccount: string | undefined = checkAccount(account);

    if (userAccount) {
      throw new ForbiddenError(userAccount);
    }

    if (
      !name ||
      !description ||
      !sizes ||
      !colors ||
      !category ||
      !stock ||
      !tags ||
      !oldPrice ||
      !newPrice ||
      !imageUrl
    ) {
      throw new UserInputError('All fields are required');
    }
    await getConnection()
      .createQueryBuilder()
      .update(Product)
      .set({
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
      })
      .where('number = :number', { number: productNumber })
      .execute();

    return { message: 'Product successfully updated' };
  } catch (error) {
    winstonEnvLogger.error({
      message: 'An error occured',
      error,
    });
    throw error;
  }
};
export default editProduct;
