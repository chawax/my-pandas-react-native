import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import React, {Component} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import RootStack from './RootStack';

const queryClient = new QueryClient();

export default class App extends Component {
  render() {
    return (
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </NativeBaseProvider>
      </QueryClientProvider>
    );
  }
}
