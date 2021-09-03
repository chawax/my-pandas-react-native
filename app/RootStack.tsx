import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {GeoPosition} from 'react-native-geolocation-service';
import DetailScreen from './screens/DetailsScreen';
import HomeScreen from './screens/HomeScreen';
import ResultsScreen from './screens/ResultsScreen';

export type RootStackParamList = {
  Home: undefined;
  Results: {position: GeoPosition};
  Details: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerTitle: 'My Pandas'}}
      />
      <Stack.Screen
        name="Results"
        component={ResultsScreen}
        options={{headerTitle: 'Résultats'}}
      />
      <Stack.Screen name="Details" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;
