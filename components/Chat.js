import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Chat = ({ route }) => {
  const { name, backgroundColor } = route.params;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text>Welcome to the chat, {name}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Chat;
