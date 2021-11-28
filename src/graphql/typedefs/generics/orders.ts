import { GraphQLList, GraphQLObjectType } from 'graphql';

import order from './order';

export default new GraphQLObjectType({
  name: 'orders',
  fields: {
    orders: { type: new GraphQLList(order) },
  },
});
