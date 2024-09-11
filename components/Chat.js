import { useState, useEffect } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore";
import { useNetInfo }from '@react-native-community/netinfo';
import AsyncStorage from "@react-native-async-storage/async-storage";



// chat component
const Chat = ({ route, navigation, isConnected }) => {
  const [messages, setMessages] = useState([]);
  const { name, userId, background, db } = route.params;
  const netInfo= useNetInfo();

  const renderInputToolbar = (props) => {
    if (netInfo.isConnected === true) {
      return <InputToolbar {...props} />;
    } else {
      return null;
    }
  };
  


  useEffect(() => {
    // set chat title
    navigation.setOptions({ title: name, color: background });
 
    let unsubscribe=()=>{};

    if (netInfo.isConnected){
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    unsubscribe = onSnapshot(q, (querySnapshot) => {
    const messagesFirestore =
        querySnapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }));
        cacheMessages(messagesFirestore);
        setMessages(messagesFirestore);
    });
  }else{
    loadCachedMessages();
  }

    // Clean up the listener
    return () => {
      if (typeof unsubscribe ==='function') {
        unsubscribe();
      }
    };
  }, [netInfo.isConnected]);
  
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
 

  // send message to chat
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }

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
  }

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={messages => onSend(messages)}
        user={{
          _id: userId,
          name: name
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


