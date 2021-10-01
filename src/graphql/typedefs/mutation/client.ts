import { GraphQLString, GraphQLNonNull, GraphQLObjectType } from 'graphql';

import message from '../generics/message';

import updateProfile from '../../resolvers/client/mutation/updateProfile';
import changePassword from '../../resolvers/client/mutation/changePassword';

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
    changePassword: {
      description: 'Change user profile',
      type: message,
      args: {
        currentPassword: { type: new GraphQLNonNull(GraphQLString) },
        newPassword: { type: new GraphQLNonNull(GraphQLString) },
        confirmPassword: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: changePassword,
    },
  }),
});
