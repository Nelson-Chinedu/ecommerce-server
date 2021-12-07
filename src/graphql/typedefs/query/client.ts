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
import getRecentOrders from '../../resolvers/client/query/getRecentOrders';
import getRecentProducts from '../../resolvers/client/query/getRecentProducts';
import getTotalMerchantProduct from '../../resolvers/client/query/getTotalMerchantProduct';
import getTotalMerchantOrder from '../../resolvers/client/query/getTotalMerchantOrder';
import getProduct from '../../resolvers/client/query/getProduct';

import profile from '../generics/profile';
import products from '../generics/products';
import orders from '../generics/orders';
import order from '../generics/order';
import count from '../generics/count';
import product from '../generics/product';

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
    getRecentOrders: {
      description: 'Get merchant recent orders',
      type: orders,
      args: {
        take: { type: new GraphQLNonNull(GraphQLInt) },
        skip: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: getRecentOrders,
    },
    getRecentProducts: {
      description: 'Get merchant recent products',
      type: products,
      args: {
        take: { type: new GraphQLNonNull(GraphQLInt) },
        skip: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: getRecentProducts,
    },
    getTotalMerchantProduct: {
      description: 'Get merchant total product count',
      type: count,
      resolve: getTotalMerchantProduct,
    },
    getTotalMerchantOrder: {
      description: 'Get merchant total order count',
      type: count,
      resolve: getTotalMerchantOrder,
    },
    getSingleProduct: {
      description: 'Get merchant single product',
      type: product,
      args: { productNumber: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: getProduct,
    },
  }),
});
