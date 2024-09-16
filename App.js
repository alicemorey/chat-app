import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";


// import components
import Start from './components/Start';
import Chat from './components/Chat';

// import firebase
import { initializeApp } from "firebase/app";

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

const Stack = createStackNavigator();


const App = () => {
  const connectionStatus = useNetInfo();
  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    setIsConnected(connectionStatus.isConnected);
    if (connectionStatus.isConnected === false) {
      console.log("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      console.log("Connection restored!");
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen 
          name="Chat" 
          options={({ route }) => ({ title: route.params.name })}
          >
          {props =><Chat {...props} isConnected={isConnected} db={db} />}
          </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

