import React from 'react';
// import navigation container
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import components
import Start from './components/Start';
import Chat from './components/Chat';


const Stack = createStackNavigator();
// App component
export default function App() {
  return (
    // add a navigation container to the app
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" component={Chat} options={({ route }) => ({ title: route.params.name })}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
