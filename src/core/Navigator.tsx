import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AktivScreenSearch from '@screens/AktivScreenSearch';
import AktivScreenDetails from '@screens/AktivScreenDetails';

const Stack = createStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="AktivScreenSearch"
          component={AktivScreenSearch}
          options={{
            title: 'Search',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AktivScreenDetails"
          component={AktivScreenDetails}
          options={{
            title: 'Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
