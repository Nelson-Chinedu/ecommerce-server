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
    const product: any = await Product.findOne({
      where: { number: id },
    });
    if (!product) return null;
    const {
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
