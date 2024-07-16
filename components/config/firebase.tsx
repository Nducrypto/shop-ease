import {initializeApp} from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  query,
  limit,
  where,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  increment,
  onSnapshot,
} from 'firebase/firestore';

import {getStorage} from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER,
  APP_ID,
  MEASUREMENT_ID,
} from '@env';

const apiKey = API_KEY;
const authDomain = AUTH_DOMAIN;
const projectId = PROJECT_ID;
const storageBucket = STORAGE_BUCKET;
const messagingSenderId = MESSAGING_SENDER;
const appId = APP_ID;
const measurementId = MEASUREMENT_ID;
// const apiKey = 'AIzaSyC2PLUxh8oduLQHY0CAzFDSpE5DcXlXYw0';
// const authDomain = 'ecomfirebase-edcfb.firebaseapp.com';
// const projectId = 'ecomfirebase-edcfb';
// const storageBucket = 'ecomfirebase-edcfb.appspot.com';
// const messagingSenderId = '396654152138';
// const appId = '1:396654152138:web:ae413d5f7ad5e2b7392733';
// const measurementId = 'G-LXGTQMKJ10';

const app = initializeApp({
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
});

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const firestore = getFirestore(app);

const storage = getStorage(app);

export {
  firestore,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  storage,
  onAuthStateChanged,
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
  query,
  limit,
  where,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  increment,
  onSnapshot,
};
