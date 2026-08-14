import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Stack from './src/routes/stack';

export default function App() {
  
  return(
      <NavigationContainer>
        <Stack/>
      </NavigationContainer>
  );
}

