import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
} from 'graphql';
import { GraphQLUpload } from 'graphql-upload';

import message from '../generics/message';
import upload from '../generics/upload';

import updateProfile from '../../resolvers/client/mutation/updateProfile';
import changePassword from '../../resolvers/client/mutation/changePassword';
import addProduct from '../../resolvers/client/mutation/addProduct';
import updateStore from '../../resolvers/client/mutation/updateStore';
import fileUpload from '../../resolvers/client/mutation/fileUpload';
import CheckoutPayment from '../../resolvers/client/mutation/checkoutPayment';
import deleteProduct from '../../resolvers/client/mutation/deleteProduct';
import editProduct from '../../resolvers/client/mutation/editProduct';
import updateOrderStatus from '../../resolvers/client/mutation/updateOrderStatus';
import cancelOrder from '../../resolvers/client/mutation/cancelOrder';

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
    updateStore: {
      description: 'Update user store',
      type: message,
      args: {
        storeName: { type: new GraphQLNonNull(GraphQLString) },
        currency: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: updateStore,
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
        tags: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        oldPrice: { type: new GraphQLNonNull(GraphQLString) },
        newPrice: { type: new GraphQLNonNull(GraphQLString) },
        imageUrl: { type: GraphQLString },
      },
      resolve: addProduct,
    },
    fileUpload: {
      description: 'Upload product image',
      type: upload,
      args: {
        file: { type: GraphQLUpload },
      },
      resolve: fileUpload,
    },
    checkoutPayment: {
      description: 'Payment Checkout',
      type: message,
      args: {
        price: { type: GraphQLInt },
        productItems: { type: new GraphQLList(GraphQLString) },
        merchantId: { type: new GraphQLList(GraphQLString) },
      },
      resolve: CheckoutPayment,
    },
    deleteProduct: {
      description: 'delete merchant product',
      type: message,
      args: { productNumber: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: deleteProduct,
    },
    editProduct: {
      description: 'Edit product',
      type: message,
      args: {
        productNumber: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        sizes: {
          type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
        },
        colors: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        category: { type: new GraphQLNonNull(GraphQLString) },
        stock: { type: new GraphQLNonNull(GraphQLString) },
        tags: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        oldPrice: { type: new GraphQLNonNull(GraphQLString) },
        newPrice: { type: new GraphQLNonNull(GraphQLString) },
        imageUrl: { type: GraphQLString },
      },
      resolve: editProduct,
    },
    updateOrderStatus: {
      description: 'Update order status',
      type: message,
      args: {
        orderNumber: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: updateOrderStatus,
    },
    cancelOrder: {
      description: 'Cancel client order',
      type: message,
      args: {
        orderNumber: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: cancelOrder,
    },
  }),
});
