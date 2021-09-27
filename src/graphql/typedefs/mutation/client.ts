import { GraphQLString, GraphQLNonNull, GraphQLObjectType } from 'graphql';

import message from '../generics/message';

import updateProfile from '../../resolvers/client/mutation/updateProfile';

export default new GraphQLObjectType({
  name: 'ClientMutation',
  description: 'Mutation accessible to client',
  fields: () => ({
    updateProfile: {
      description: 'Update user profile',
      type: message,
      args: {
        firstname: { type: new GraphQLNonNull(GraphQLString) },
        lastname: { type: new GraphQLNonNull(GraphQLString) },
        phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
        gender: { type: GraphQLString },
        region: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        country: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLNonNull(GraphQLString) },
        imageUrl: { type: GraphQLString },
      },
      resolve: updateProfile,
    },
  }),
});
