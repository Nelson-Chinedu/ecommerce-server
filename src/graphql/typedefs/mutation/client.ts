import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';

import message from '../generics/message';

import updateProfile from '../../resolvers/client/mutation/updateProfile';
import changePassword from '../../resolvers/client/mutation/changePassword';
import addProduct from '../../resolvers/client/mutation/addProduct';

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
        city: { type: new GraphQLNonNull(GraphQLString) },
        country: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLNonNull(GraphQLString) },
        storeName: { type: GraphQLString },
        currency: { type: GraphQLString },
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
    addProduct: {
      description: 'Add product',
      type: message,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        sizes: {
          type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
        },
        colors: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        category: { type: new GraphQLNonNull(GraphQLString) },
        stock: { type: new GraphQLNonNull(GraphQLString) },
        // sold: { type: GraphQLString },
        tags: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        oldPrice: { type: new GraphQLNonNull(GraphQLString) },
        newPrice: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: addProduct,
    },
  }),
});
