import { useState, useEffect } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore";

// chat component
const Chat = ({ route, navigation, db }) => {
  const [messages, setMessages] = useState([]);
  const { name, userId, background } = route.params;

 // add message to chat
  useEffect(() => {
    navigation.setOptions({ title: name, color:background });

    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }))
      );
    });

    // Clean up the listener
    return () => unsubscribe();
  }, []);

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


