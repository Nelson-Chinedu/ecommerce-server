import winstonEnvLogger from 'winston-env-logger';
import { ForbiddenError, UserInputError } from 'apollo-server';

import { Account, Product, Store } from '../../../../db';
import { AccountType } from '../../../../db/entity/Account';

import IContext from '../../../../interface/IContext';
import { IProduct } from '../../../../interface/IArgs';

const addProduct = async (
  _parent: unknown,
  args: IProduct,
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
    imageUrl,
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
      !newPrice ||
      !imageUrl
    ) {
      throw new UserInputError('All fields are required');
    }
    const account: Account | undefined = await Account.findOne({
      where: {
        id,
      },
      relations: ['profile'],
    });
    if (!account || (account && account.accountType !== AccountType.MERCHANT)) {
      throw new ForbiddenError('Permission denied');
    } else if (account && account.blocked) {
      throw new ForbiddenError('Account blocked, kindly contact support');
    }

    const store = await Store.findOne({
      where: {
        profile: account.profile,
      },
    });

    const newProduct: any = Product.create({
      store,
      name,
      description,
      imageUrl,
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
