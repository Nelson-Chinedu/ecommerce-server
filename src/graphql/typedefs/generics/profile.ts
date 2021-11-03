import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} from 'graphql';
import account from './account';
import location from './location';
import store from './store';

export default new GraphQLObjectType({
  name: 'profile',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    firstname: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lastname: {
      type: new GraphQLNonNull(GraphQLString),
    },
    phoneNumber: {
      type: GraphQLString,
    },
    gender: {
      type: GraphQLString,
    },
    region: {
      type: new GraphQLNonNull(GraphQLString),
    },
    city: {
      type: new GraphQLNonNull(GraphQLString),
    },
    country: {
      type: new GraphQLNonNull(GraphQLString),
    },
    address: {
      type: new GraphQLNonNull(GraphQLString),
    },
    imageUrl: {
      type: GraphQLString,
    },
    store: {
      type: store,
    },
    location: {
      type: location,
    },
    account: {
      type: account,
    },
  },
});
