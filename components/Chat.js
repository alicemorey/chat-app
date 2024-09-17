
// react native & apis
import { useState, useEffect } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import MapView from 'react-native-maps';

import { v4 as uuidv4 } from 'uuid';

// gifted chat components
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";

// firebase firestore
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// async for data caching
import AsyncStorage from "@react-native-async-storage/async-storage";

// custom actions comp
import CustomActions from './CustomActions';

// chat component
const Chat = ({ db, route, navigation, isConnected }) => {
  const [messages, setMessages] = useState([]);
  const { name, userId, background} = route.params;

  
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  const user = {_id:userId, name};

  const storage = getStorage();

    let unsubMessages;
    useEffect(() => {
      navigation.setOptions({ title: name });
      if (isConnected === true) {
  
        if (unsubMessages) unsubMessages();
        unsubMessages = null;
  
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        unsubMessages = onSnapshot(q, (docs) => {
          
        let newMessages = [];
          docs.forEach(doc => {
            newMessages.push({
              id: doc.id,
              ...doc.data(),
              createdAt: new Date(doc.data().createdAt.toMillis())
            })
          })
        cacheMessages(newMessages);
        setMessages(newMessages);
    });
  }else loadCachedMessages();
  

    // Clean up the listener
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, [isConnected])
  
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log('Error caching messages:', error.message);
    }
  };


  const loadCachedMessages = async () => {
    try {
      const cachedMessages = await AsyncStorage.getItem('messages');
      if (cachedMessages !== null) {
        setMessages(JSON.parse(cachedMessages));
      }
    } catch (error) {
      console.log('Error loading cached messages:', error.message);
    }
  };
 
   


 //Toolbar component
  const renderInputToolbar = (props) => {
    if (isConnected === true) {
      return <InputToolbar {...props} />;
    } else {
      return null;
    }
  };

  // bubble component
  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  };

  const renderCustomActions = ({props} ) => {
    return (
    <CustomActions 
    {...props} 
    storage={storage} 
    userID={user._id} 
    onSend={onSend} 
    name={name}
    />
    );
  };

  const renderCustomView = (props) => {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
        <TouchableOpacity
          onPress={openMaps}
          style={{
            backgroundColor: "gray",
            width: 200,
            height: 150,
            borderRadius: 13,
          }}
        >
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
          </TouchableOpacity>
      );
    }
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userId,
          name
        }}
        
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : <KeyboardAvoidingView behavior="padding" />}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Chat;
