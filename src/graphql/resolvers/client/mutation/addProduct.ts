import winstonEnvLogger from 'winston-env-logger';
import { ForbiddenError, UserInputError } from 'apollo-server';

import { Account, Product } from '../../../../db';

import IContext from '../../../../interface/IContext';
import { IAddProduct } from '../../../../interface/IArgs';

const addProduct = async (
  _parent: unknown,
  args: IAddProduct,
  { user: { id } }: IContext
) => {
  const {
    name,
    description,
    sizes,
    colors,
    category,
    stock,
    tags,
    oldPrice,
    newPrice,
  } = args;
  try {
    if (
      !name ||
      !description ||
      !sizes ||
      !colors ||
      !category ||
      !stock ||
      !tags ||
      !oldPrice ||
      !newPrice
    ) {
      throw new UserInputError('All fields are required');
    }
    const account = await Account.findOne({
      where: {
        id,
      },
    });
    if (!account || (account && account.accountType !== 'm')) {
      throw new ForbiddenError('Permission denied');
    } else if (account && account.blocked) {
      throw new ForbiddenError('Account blocked, kindly contact support');
    }
    const newProduct = Product.create({
      name,
      description,
      sizes,
      colors,
      stock,
      tags,
      category,
      oldPrice,
      newPrice,
      account,
    });
    await newProduct.save();
    return { message: 'Product added successfully' };
  } catch (error) {
    winstonEnvLogger.error({
      message: 'An error occured',
      error,
    });
    throw error;
  }
};
export default addProduct;
