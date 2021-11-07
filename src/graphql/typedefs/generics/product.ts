import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'product',
  fields: {
    id: {
      type: GraphQLID,
    },
    number: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    sizes: {
      type: new GraphQLList(GraphQLString),
    },
    colors: {
      type: new GraphQLList(GraphQLString),
    },
    category: {
      type: GraphQLString,
    },
    stock: {
      type: GraphQLString,
    },
    tags: {
      type: new GraphQLList(GraphQLString),
    },
    oldPrice: {
      type: GraphQLString,
    },
    newPrice: {
      type: GraphQLString,
    },
    imageUrl: {
      type: GraphQLString,
    },
  },
});