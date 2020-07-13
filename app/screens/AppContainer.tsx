import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import List from './List';
import Tasks from './Tasks';
import NetInfo from '@react-native-community/netinfo';

const Stack = createStackNavigator();

export default () => {
  useEffect(() => {
    const netInfoUnsubscribe = NetInfo.addEventListener((state) => {
      console.log(state.isConnected);
    });

    return () => {
      netInfoUnsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="List"
          component={List}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tasks"
          component={Tasks}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
