// Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBO2JvbUjab6RcFEO0_rzcWVvVTns7FlO0',
  authDomain: 'brand-review-cf503.firebaseapp.com',
  projectId: 'brand-review-cf503',
  storageBucket: 'brand-review-cf503.appspot.com',
  messagingSenderId: '183049042466',
  appId: '1:183049042466:web:53b17e885f758a7741287b',
  measurementId: 'G-6H5RR73MQK',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})
export const db = getFirestore(app)
