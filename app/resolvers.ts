import { Resolvers, gql } from 'apollo-boost';
import { getTodos } from './queries/todos';
import { todo } from 'types';
import { ApolloCache } from 'apollo-cache';

type ResolverFn = (
  parent: any,
  args: any,
  { cache }: { cache: ApolloCache<any> },
) => any;

interface ResolverMap {
  [field: string]: ResolverFn;
}

interface AppResolvers extends Resolvers {
  Query: ResolverMap;
}

export const resolvers: AppResolvers = {};
