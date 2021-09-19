import { GraphQLString, GraphQLNonNull, GraphQLObjectType } from 'graphql';

import accountType from '../generics/account';

export default new GraphQLObjectType({
  name: 'PublicQuery',
  description: 'Query accessible to public',
  fields: () => ({
    createdUser: {
      description: 'Add new user',
      type: accountType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      // resolve: () => ({}),
    },
  }),
});
