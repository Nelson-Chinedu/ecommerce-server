import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'product_count',
  fields: {
    count: {
      type: GraphQLInt,
    },
  },
});
