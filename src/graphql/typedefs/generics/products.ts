import { GraphQLObjectType, GraphQLList } from 'graphql';

import productList from './product';

export default new GraphQLObjectType({
  name: 'products',
  fields: {
    products: {
      type: new GraphQLList(productList),
    },
  },
});
