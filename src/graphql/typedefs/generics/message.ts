import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'message',
  fields: {
    message: {
      type: new GraphQLNonNull(GraphQLString),
    },
    token: {
      type: new GraphQLNonNull(GraphQLString),
    },
    status: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});
