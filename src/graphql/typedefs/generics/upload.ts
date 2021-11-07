import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'fileUpload',
  fields: {
    url: {
      type: GraphQLString,
    },
  },
});
