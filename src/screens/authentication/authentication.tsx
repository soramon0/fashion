import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import OnBoarding from './on-boarding';

const AuthenticationStack = createStackNavigator();

const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator screenOptions={{headerShown: false}}>
      <AuthenticationStack.Screen name="OnBoarding" component={OnBoarding} />
    </AuthenticationStack.Navigator>
  );
};

export default AuthenticationNavigator;
