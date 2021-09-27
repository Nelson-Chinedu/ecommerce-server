import { GraphQLObjectType } from 'graphql';

import account from '../generics/account';

import getProfile from '../../resolvers/client/query/profile';

export default new GraphQLObjectType({
  name: 'ClientQuery',
  description: 'Mutation accessible to client',
  fields: () => ({
    getProfile: {
      description: 'Get user profile',
      type: account,
      resolve: getProfile,
    },
  }),
});
