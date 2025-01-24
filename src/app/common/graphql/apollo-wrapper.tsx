
'use client';
import { ApolloProvider } from '@apollo/client';
import { ReactNode } from 'react';
import client from './apollo-client';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

export default function ApolloWrapper({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client} ><Provider store={store}>{children}</Provider></ApolloProvider>;
}
