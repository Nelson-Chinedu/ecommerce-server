import { getRepository } from 'typeorm';
import winstonEnvLogger from 'winston-env-logger';

import { Product } from '../../../../db';

interface IArgs {
  take: number | undefined;
  skip: number | undefined;
  category: string;
}

const getSneakerProducts = async (
  _parent: unknown,
  args: IArgs,
  _context: unknown
) => {
  try {
    const products: Product[] | undefined = await getRepository(Product)
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.store', 'store')
      .leftJoinAndSelect('product.account', 'account')
      .where('product.category = :product', {
        product: args.category,
      })
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

export default getSneakerProducts;
