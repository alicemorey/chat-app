**Project: React Native Mobile Chat App**

The objective of this project is to build a chat app for mobile devices using React Native. The app will provide users with a chat interface and options to share images and their location.

**Features & Requirements**

**Key Features**
- A page where users can enter their name and choose a background color for the chat screen before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images and location data. 
- Data gets stored online and offline. Technical Requirements 
- The app must be written in React Native. 
- The app must be developed using Expo.
- The app must be styled according to the given screen design. 
- Chat conversations must be stored in Google Firestore Database. 
- The app must authenticate users anonymously via Google Firebase authentication. 
- Chat conversations must be stored locally. 
- The app must let users pick and send images from the phone’s image library. 
- The app must let users take pictures with the device’s camera app, and send them. 
- The app must store images in Firebase Cloud Storage
- The app must be able to read the user’s location data.
- Location data must be sent via the chat in a map view. 
- The chat interface and functionality must be created using the Gifted Chat library. 
- The app’s codebase must contain comments.

**Technical Requirements**

- The app must be written in React Native.
- The app must be developed using Expo.
- The app must be styled according to the given screen design.
- Chat conversations must be stored in Google Firestore Database.
- The app must authenticate users anonymously via Google Firebase authentication.
- Chat conversations must be stored locally. 
- The app must let users pick and send images from the phone’s image library. 
- The app must let users take pictures with the device’s camera app, and send them. 
- The app must store images in Firebase Cloud Storage
- The app must be able to read the user’s location data. 
- Location data must be sent via the chat in a map view. 
- The chat interface and functionality must be created using the Gifted Chat library. 
- The app’s codebase must contain comments.

**Technologies Used:**
- React Native
- Expo
- Expo ImagePicker
- Expo Location
- Google Firestore/Firebase
- Gifted
- Android Studio

**Start the expo project**

- `npx expo start`

**User Stories**
- As a user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any time.

**Before you begin, ensure you have the following installed:**


Node.js (version 16.x.x)
Expo CLI: npm install -g expo-cli
Watchman (recommended for macOS users)
Android Studio (for Android development)
Xcode (for iOS development, macOS only)

**Installation**
Node.js Version
Downgrade Node.js to version "16.19.0":

nvm install 16.19.0
nvm use 16.19.0
Clone the repository:

git clone h

**Navigate to the project directory:**

cd chat-app

Install dependencies:

- `npm install`

**Start the application**

- `npm start`
**Firebase Configuration**

Firebase Configuration: Sign in to Google Firebase.

Create a new Firebase project.
Set up Firestore Database in production mode.
Adjust Firestore Rules to allow read and write access.
Configure Firebase Storage (optional).
App Integration
Register your app in the Firebase Console.

Install Firebase SDK:

npm install firebase
Initialize Firebase in your App.js file.

Prerequisites
Download the Expo Go app on your mobile device.
Open the app.
Connect your device to the same network as your development machine.
Run npx expo start on your development machine.
Alternatively, you can scan the QR code with the Expo Go app.
Usage
Enter your name and select a background color to start chatting.
Send text messages, share images, or share your current location.
Access and view messages offline, ensuring your chat history is always available.
Deployment
The Chat App is still under development.

Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the code style and include tests for new features

**Testing Options**

download and connect the expo app on your mobile device
Android Studio (android)
Xcode (iOS)

By Alice Morey