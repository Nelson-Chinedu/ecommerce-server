import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import getProducts from '../../resolvers/public/query/getProducts';
import getProduct from '../../resolvers/public/query/getProduct';
import getMenProducts from '../../resolvers/public/query/getMenProducts';
import getWomenProducts from '../../resolvers/public/query/getWomenProducts';
import getKidProducts from '../../resolvers/public/query/getKidProducts';
import getShoeProducts from '../../resolvers/public/query/getShoeProduct';
import getWatchProducts from '../../resolvers/public/query/getWatchProduct';
import getShirtProducts from '../../resolvers/public/query/getShirtProduct';
import getHoodieProducts from '../../resolvers/public/query/getHoodieProduct';
import getSneakerProducts from '../../resolvers/public/query/getSneakerProducts';

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
    getMenProducts: {
      description: 'Get every men category product',
      type: products,
      args: {
        take: { type: GraphQLInt },
        skip: { type: GraphQLInt },
        category: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getMenProducts,
    },
    getWomenProducts: {
      description: 'Get every women category product',
      type: products,
      args: {
        take: { type: GraphQLInt },
        skip: { type: GraphQLInt },
        category: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getWomenProducts,
    },
    getKidProducts: {
      description: 'Get every kid category product',
      type: products,
      args: {
        take: { type: GraphQLInt },
        skip: { type: GraphQLInt },
        category: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getKidProducts,
    },
    getShoeProducts: {
      description: 'Get every shoe category product',
      type: products,
      args: {
        take: { type: GraphQLInt },
        skip: { type: GraphQLInt },
        category: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getShoeProducts,
    },
    getWatchProducts: {
      description: 'Get every watch category product',
      type: products,
      args: {
        take: { type: GraphQLInt },
        skip: { type: GraphQLInt },
        category: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getWatchProducts,
    },
    getShirtProducts: {
      description: 'Get every shirt category product',
      type: products,
      args: {
        take: { type: GraphQLInt },
        skip: { type: GraphQLInt },
        category: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getShirtProducts,
    },
    getHoodieProducts: {
      description: 'Get every hoodie category product',
      type: products,
      args: {
        take: { type: GraphQLInt },
        skip: { type: GraphQLInt },
        category: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getHoodieProducts,
    },
    getSneakerProducts: {
      description: 'Get every sneaker category product',
      type: products,
      args: {
        take: { type: GraphQLInt },
        skip: { type: GraphQLInt },
        category: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getSneakerProducts,
    },
    getAllProducts: {
      description: 'Get every product related to a category',
      type: products,
      args: {
        take: { type: GraphQLInt },
        skip: { type: GraphQLInt },
        category: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getMenProducts,
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
