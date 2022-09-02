import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {Authentication} from './src/screens/authentication';

function App() {
  return (
    <NavigationContainer>
      <Authentication />
    </NavigationContainer>
  );
}

export default App;
