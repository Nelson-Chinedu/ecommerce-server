import { GraphQLObjectType } from 'graphql';

import PublicQuery from './public';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'Root mutattion for multibuy',
  fields: () => ({
    public: {
      type: PublicQuery,
      resolve: () => ({}),
    },
  }),
});
