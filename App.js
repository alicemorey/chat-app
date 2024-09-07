import React from 'react';
// import navigation container
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import components
import Start from './components/Start';
import Chat from './components/Chat';

// import firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCcg0XaOLEvP_STssHOvLszDuRmgTqtjDY",
    authDomain: "chat-app-ddce0.firebaseapp.com",
    projectId: "chat-app-ddce0",
    storageBucket: "chat-app-ddce0.appspot.com",
    messagingSenderId: "335776907614",
    appId: "1:335776907614:web:1a68865a358055251ecfcf"
  }
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

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
