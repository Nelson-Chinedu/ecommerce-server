import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'account',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLID),
    },
    blocked: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    verified: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    accountType: {
      type: GraphQLString,
    },
  },
});
