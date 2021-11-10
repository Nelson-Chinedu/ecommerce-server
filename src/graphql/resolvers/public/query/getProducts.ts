import { getRepository } from 'typeorm';
import winstonEnvLogger from 'winston-env-logger';

import { Product } from '../../../../db';

interface IArgs {
  take: number | undefined;
  skip: number | undefined;
}

const getProducts = async (
  _parent: unknown,
  args: IArgs,
  _context: unknown
) => {
  try {
    const products = await getRepository(Product)
      .createQueryBuilder('product')
      .skip(args.skip)
      .take(args.take)
      .getMany();
    return { products };
  } catch (error) {
    winstonEnvLogger.error({
      message: 'An error occured',
      error,
    });
    throw error;
  }
};

export default getProducts;
