import { GraphQLObjectType } from 'graphql';
import { ForbiddenError } from 'apollo-server';

import PublicMutation from './public';
import ClientMutation from './client';

export default new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root mutattion for multibuy',
  fields: () => ({
    public: {
      type: PublicMutation,
      resolve: () => ({}),
    },
    client: {
      type: ClientMutation,
      resolve: (_parent, _args, { isAuthorized }) => {
        if (isAuthorized) {
          return {};
        }
        throw new ForbiddenError('Not authorized');
      },
    },
  }),
});
