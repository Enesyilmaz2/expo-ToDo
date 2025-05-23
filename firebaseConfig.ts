import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDeUECI10R4t9s9Baw93aoQRlHWNSFdAog',
  authDomain: 'expo-todo-f98a3.firebaseapp.com',
  projectId: 'expo-todo-f98a3',
  storageBucket: 'expo-todo-f98a3.appspot.com',
  messagingSenderId: '355155051276',
  appId: '1:355155051276:web:a57cef30782c57b27c7f29',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
