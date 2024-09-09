import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ImageBackground, Alert, Button } from 'react-native';
import { KeyboardAvoidingView, Platform } from 'react-native';

// import getAuth
import { getAuth, signInAnonymously } from "firebase/auth";

// start component
const Start = ({ navigation }) => {

  //state to set name
  const [name, setName] = useState('');
  //state for background color
  const [background, setBackground] = useState('');

const backgroundImage= require('../img/BackgroundImage.png');

const auth = getAuth();

const signInUser = () => {
  signInAnonymously(auth)
    .then(result => {
      navigation.navigate('Chat', { userId: result.user.uid,
        name: name, 
        background: background});
        Alert.alert ("Signed in successfully!");
      
    })
    .catch((error) => {
      Alert.alert ("Unable to sign in, try later!");
    })
};


  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}>
        <View style={styles.content}>
          <Text style={styles.title}>Chat App</Text>
          <Text>Hello {name}</Text>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.colorButton,{ backgroundColor: '#FF5733' }]}
              onPress={() => setBackground("#FF5733")}
            >
              <Text style={styles.buttonText}>
                Set Colour!
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.colorButton, {backgroundColor: '#90EE90'}]}
              onPress={ ()=> setBackground("#90EE90")}
            >
              <Text style={styles.buttonText}>
                Set Colour!
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.colorButton, {backgroundColor: '#ADD8E6'}]}
              onPress={ ()=> setBackground("#ADD8E6")}
            >
              <Text style={styles.buttonText}>
                Set Colour!
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            title="Go to chat"
            onPress={()=> {
              if (name === '') {
                Alert.alert('Please enter your name');
              } else {
                signInUser();
              }
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
 // styles for start component
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%', 
        resizeMode: 'cover',  
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
    textInput: {
      width: '100%',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 20,
      fontSize: 16,
    },
  
      colorButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'transparent',
      },
      
   
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },

    image: {
    flex: 1,
    justifyContent: 'center',
  },
  });

export default Start;