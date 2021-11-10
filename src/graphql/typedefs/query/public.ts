import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import getProducts from '../../resolvers/public/query/getProducts';
import getProduct from '../../resolvers/public/query/getProduct';

import products from '../generics/products';
import product from '../generics/product';

export default new GraphQLObjectType({
  name: 'PublicQuery',
  description: 'Query accessible to public',
  fields: () => ({
    getProducts: {
      description: 'Get every merchant product for user',
      type: products,
      args: {
        take: { type: GraphQLInt },
        skip: { type: GraphQLInt },
      },
      resolve: getProducts,
    },
    getProduct: {
      description: 'Get single product',
      type: product,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getProduct,
    },
  }),
});
