// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2A5Jz_s3zEl0f4MrKGrQpSdrG-gTnTX8",
  authDomain: "flat-camaleon.firebaseapp.com",
  projectId: "flat-camaleon",
  storageBucket: "flat-camaleon.appspot.com",
  messagingSenderId: "773881080940",
  appId: "1:773881080940:web:f155d35b0516021f6a7c49",
  measurementId: "G-WJK6YJVGGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)