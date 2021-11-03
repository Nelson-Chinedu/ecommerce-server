import { GraphQLObjectType } from 'graphql';

import getProfile from '../../resolvers/client/query/profile';

import profile from '../generics/profile';

export default new GraphQLObjectType({
  name: 'ClientQuery',
  description: 'Mutation accessible to client',
  fields: () => ({
    getProfile: {
      description: 'Get user profile',
      type: profile,
      resolve: getProfile,
    },
  }),
});
