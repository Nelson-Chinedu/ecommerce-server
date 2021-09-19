import { GraphQLSchema } from 'graphql';

import mutation from './typedefs/mutation';
import query from './typedefs/query';

export default new GraphQLSchema({
  mutation,
  query,
});
