import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import EnviarProduto from './EnviarProduto';

import Home from './Home';
import Form from './Form';

const Stack = createNativeStackNavigator();

export default function Navegacao() {
  return (
    <EnviarProduto>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Formulario' component={Form} />
      </Stack.Navigator>
    </EnviarProduto>
  );
}