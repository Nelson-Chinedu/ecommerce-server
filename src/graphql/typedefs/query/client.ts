import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import getProducts from '../../resolvers/client/query/getProducts';
import getProfile from '../../resolvers/client/query/profile';
import getCustomerOrders from '../../resolvers/client/query/getCustomerOrders';
import getMerchantOrders from '../../resolvers/client/query/getMerchantOrders';
import previewOrder from '../../resolvers/client/query/previewOrder';

import profile from '../generics/profile';
import products from '../generics/products';
import orders from '../generics/orders';
import order from '../generics/order';

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
      description: 'Get merchant products',
      type: products,
      args: {
        take: { type: new GraphQLNonNull(GraphQLInt) },
        skip: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: getProducts,
    },
    getCustomerOrders: {
      description: 'Get customer orders',
      type: orders,
      resolve: getCustomerOrders,
    },
    getMerchantOrders: {
      description: 'Get merchant orders',
      type: orders,
      resolve: getMerchantOrders,
    },
    previewOrder: {
      description: 'Customer order preview',
      type: order,
      args: {
        productId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: previewOrder,
    },
  }),
});
