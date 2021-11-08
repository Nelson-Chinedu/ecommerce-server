import { GraphQLObjectType, GraphQLInt } from 'graphql';

import getProducts from '../../resolvers/client/query/getProducts';

import products from '../generics/products';

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
  }),
});
