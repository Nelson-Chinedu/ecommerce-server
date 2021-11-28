import winstonEnvLogger from 'winston-env-logger';

import { Product } from '../../../../db';

interface IArgs {
  id: number | string;
}

const getProduct = async (
  _parent: unknown,
  { id }: IArgs,
  _context: unknown
) => {
  try {
    const product: Product | undefined = await Product.findOne({
      where: { number: id },
      relations: ['account'],
    });
    if (!product) return null;

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
      account,
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
