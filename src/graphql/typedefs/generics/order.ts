import { GraphQLObjectType, GraphQLString } from 'graphql';

import product from './product';
import account from './account';

export default new GraphQLObjectType({
  name: 'order',
  fields: {
    orderId: { type: GraphQLString },
    merchantId: { type: GraphQLString },
    customerId: { type: GraphQLString },
    status: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    product: { type: product },
    account: { type: account },
  },
});
