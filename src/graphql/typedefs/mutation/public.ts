import { GraphQLString, GraphQLNonNull, GraphQLObjectType } from 'graphql';

// import account from '../generics/account';
import message from '../generics/message';

import signup from '../../resolvers/public/mutation/signup';

export default new GraphQLObjectType({
  name: 'PublicMutation',
  description: 'Mutation accessible to public',
  fields: () => ({
    signup: {
      description: 'Add new user',
      type: message,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        accountType: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: signup,
    },
  }),
});
