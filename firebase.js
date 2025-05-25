// Importa las funciones necesarias de Firebase
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAAYbN155L83DPP_I9DbspEV0opuTNEBJ8",
  authDomain: "reactautenticacion-17381.firebaseapp.com",
  projectId: "reactautenticacion-17381",
  storageBucket: "reactautenticacion-17381.appspot.com",
  messagingSenderId: "301074572191",
  appId: "1:301074572191:web:f18ff79cc2d0cebcb993aa"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa la autenticación con persistencia en AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Inicializa Firestore
const db = getFirestore(app);

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
};
