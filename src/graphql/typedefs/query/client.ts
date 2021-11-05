import { GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';

import getProduct from '../../resolvers/client/query/getProduct';
import getProfile from '../../resolvers/client/query/profile';

import profile from '../generics/profile';
import products from '../generics/products';

export default new GraphQLObjectType({
  name: 'ClientQuery',
  description: 'Mutation accessible to client',
  fields: () => ({
    getProfile: {
      description: 'Get user profile',
      type: profile,
      resolve: getProfile,
    },
    getProduct: {
      description: 'Get user product',
      type: products,
      args: {
        take: { type: new GraphQLNonNull(GraphQLInt) },
        skip: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: getProduct,
    },
  }),
});
