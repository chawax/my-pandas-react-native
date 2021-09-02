import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import React, {Component} from 'react';
import RootStack from './RootStack';

export default class App extends Component {
  render() {
    return (
      <NativeBaseProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </NativeBaseProvider>
    );
  }
}
