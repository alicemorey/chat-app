


//import react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import screens
import Start from './components/Start';
import Chat from './components/Chat';

// import firebase
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useNetInfo }from '@react-native-community/netinfo';
import { useState, useEffect } from "react";

//create the navigation stack
const Stack = createStackNavigator();


const App = () => {
  const connectionStatus = useNetInfo();

  const firebaseConfig = {
    apiKey: "AIzaSyCcg0XaOLEvP_STssHOvLszDuRmgTqtjDY",
    authDomain: "chat-app-ddce0.firebaseapp.com",
    projectId: "chat-app-ddce0",
    storageBucket: "chat-app-ddce0.appspot.com",
    messagingSenderId: "335776907614",
    appId: "1:335776907614:web:1a68865a358055251ecfcf"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage = getStorage(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen 
          name="Chat" 
          >
          {props =><Chat 
          isConnected={connectionStatus.isConnected} 
          db={db}
          storage={storage}
          {...props} 
           />}
          </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

