import { GraphQLObjectType } from 'graphql';

import PublicMutation from './public';

export default new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root mutattion for multibuy',
  fields: () => ({
    public: {
      type: PublicMutation,
      resolve: () => ({}),
    },
  }),
});
