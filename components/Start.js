import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ImageBackground } from 'react-native';


// start component
const Start = ({ navigation }) => {
    const [name, setName] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('#090C08');

  const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

    const handleStartChat = () => {
        if (name.trim()) {
            navigation.navigate('Chat', { name: name, backgroundColor: backgroundColor });
          }
        };

  return (
    <ImageBackground
      source={require('../img/BackgroundImage.png')}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
    <View style={styles.container}>
      <Text style={styles.title}>Chat App</Text>
       <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.colorSelectionText}>Choose Background Color:</Text>
        <View style={styles.colorSelection}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorButton,
                { backgroundColor: color },
                backgroundColor === color && styles.selectedColor,
              ]}
              onPress={() => setBackgroundColor(color)}
            />
          ))}
          </View>
      <TouchableOpacity style={styles.button} onPress={handleStartChat}>
    <Text style={styles.buttonText}>Start Chatting</Text>
    </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

 // styles for start component
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
      },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.3)', // Add a semi-transparent overlay
        padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 20,
      fontSize: 16,
    },
    colorSelectionText: {
        color: '#ffffff',
        fontSize: 16,
        marginBottom: 10,
      },
      colorSelection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
      },
      colorButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'transparent',
      },
      selectedColor: {
        borderColor: '#ffffff',
      },
    button: {
      backgroundColor: '#007bff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    }
  });

export default Start;