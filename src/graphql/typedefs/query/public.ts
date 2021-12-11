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
