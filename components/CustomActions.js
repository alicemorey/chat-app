import { useEffect } from "react";
import { TouchableOpacity, StyleSheet, View, Text, Alert  } from "react-native";
import 'react-native-get-random-values';

import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

import { v4 as uuidv4 } from 'uuid';

import { useActionSheet } from '@expo/react-native-action-sheet';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


const CustomActions = ({ 
    wrapperStyle, iconTextStyle, onSend, storage, userID, name }) => {
    const actionSheet = useActionSheet();

// generate a unique ref string for image
    const generateReference = (uri) => {
        const timeStamp = (new Date()).getTime();
        const imageName = uri.split("/")[uri.split("/").length - 1];
        return `${userID}-${timeStamp}-${imageName}`;
      }

    const onActionPress = () => {
        const options = [
            'Choose From Library', 
            'Take Picture', 
            'Send Location', 
            'Cancel'];

        const cancelButtonIndex = options.length - 1;

        actionSheet.showActionSheetWithOptions(
            {
              options,
              cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                  case 0:
                    pickImage();
                    return;
                  case 1:
                    takePhoto();
                    return;
                  case 2:
           getLocation();
          default:
        }
      },
    );
    };

   const uploadAndSendImage = async (imageURI) => {
    // Take the image URI as a prop, generate unique reference string, and fetch the image
    const uniqueRefString = generateReference(imageURI);
    const newUploadRef = ref(storage, uniqueRefString);
    const response = await fetch(imageURI);
    // Get the image as a blob to upload to Firebase storage
    const blob = await response.blob();
    // Method to upload blob to the Firebase storage bucket
    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      // Get the download URL of the image
      const imageURL = await getDownloadURL(snapshot.ref);
      const imageMessage = {
        _id: uuidv4(),
        text: "",
        createdAt: new Date(),
        user: { _id: userID, name: name },
        image: imageURL,
      };
      // Send the image message to the GiftedChat component
      onSend([imageMessage]);
    });
  };


  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions?.granted) {
      // Launch the image library to select an image
      let result = await ImagePicker.launchImageLibraryAsync();
      // Check if the user selected an image
      if (!result.canceled) {
        // Upload the image and send it to the GiftedChat component
        await uploadAndSendImage(result.assets[0].uri);
      } else if (result.canceled) {
        return;
      } else Alert.alert("Permission access denied.");
    }
  };
    
      const takePhoto = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync();   
        if (permissions?.granted) {

         // launch camera 
        let result = await ImagePicker.launchCameraAsync();

          if (!result.canceled) {
            await uploadAndSendImage(result.assets[0].uri);
            console.log('uploading and uploading the image occurs here');
          } else if (result.canceled) {
            return;
          } else Alert.alert("Permission access denied.");
        }
      };
    
      const getLocation = async () => {
        try {
          let permissions = await Location.requestForegroundPermissionsAsync();
          if (permissions?.granted) {
            // Get the current location
            const location = await Location.getCurrentPositionAsync({});
            if (location) {
              // Format the message with the correct data 
              const locationMessage = {
                _id: uuidv4(),
                text: "",
                createdAt: new Date(),
                user: { _id: userID, name: name },
                location: {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                },
              };
              onSend([locationMessage]);
            } else {
              Alert.alert("Location data is not available.");
            }
          } else {
            Alert.alert("Location access denied. Please enable location access.");
          }
        } catch (error) {
          // Log any errors that occur during the process
          console.error("Error in getLocation function:", error);
          Alert.alert("An error occurred while fetching location.");
        }
      };
    
     
  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
    <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container: {
      width: 26,
      height: 26,
      marginLeft: 10,
      marginBottom: 10,
    },
    wrapper: {
      borderRadius: 13,
      borderColor: '#b2b2b2',
      borderWidth: 2,
      flex: 1,
    },
    iconText: {
      color: '#b2b2b2',
      fontWeight: 'bold',
      fontSize: 16,
      backgroundColor: 'transparent',
      textAlign: 'center',
    },
  });

export default CustomActions;