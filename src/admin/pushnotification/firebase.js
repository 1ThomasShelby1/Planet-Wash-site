// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQGf9gqU3_S-Oj_g4MV2yhVP8yugjYIkQ",
  authDomain: "pushnotifications-283cd.firebaseapp.com",
  projectId: "pushnotifications-283cd",
  storageBucket: "pushnotifications-283cd.firebasestorage.app",
  messagingSenderId: "853690030476",
  appId: "1:853690030476:web:5a2caee2ed7c2f6c2c5ea9",
  measurementId: "G-N7ZHDP5GT7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  if (permission ===  'granted') {
     const token = await getToken(messaging, {
    vapidKey:
      "BIie0FMIaMpDtphtS2p5_ntkHC8OkYTNbtE9v9ziDjrRjod6knuIvo722TLWrTSUx1sAcSmqSwnr9jnv0fqu9OA"
  });
  }
}