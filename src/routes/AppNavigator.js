import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import Splash from '../views/Splash';
import SignIn from '../views/Auth/SignIn';
import Main from '../views/Main';
import Onboarding from '../views/Onboarding';
import CategoryDetails from '../views/CategoryDetails';
import SubCategory from '../views/CategoryDetails/components/SubCategory';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="CategoryDetails" component={CategoryDetails} />
        <Stack.Screen name="SubCategory" component={SubCategory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
