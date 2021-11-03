import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'store',
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    currency: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});
