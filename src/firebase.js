// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuFBLNbw4Jws704R3w_svUA4thB2xxJRA",
  authDomain: "flats-kamaleon.firebaseapp.com",
  projectId: "flats-kamaleon",
  storageBucket: "flats-kamaleon.appspot.com",
  messagingSenderId: "381918019528",
  appId: "1:381918019528:web:9ab7149392b5ffba3e4afd",
  measurementId: "G-DG3XKQPVGF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)


//TODO: @David Morales
/* 
apiKey: "AIzaSyDuFBLNbw4Jws704R3w_svUA4thB2xxJRA",
  authDomain: "flats-kamaleon.firebaseapp.com",
  projectId: "flats-kamaleon",
  storageBucket: "flats-kamaleon.appspot.com",
  messagingSenderId: "381918019528",
  appId: "1:381918019528:web:9ab7149392b5ffba3e4afd",
  measurementId: "G-DG3XKQPVGF" */

//TODO: @Sandra Inacaza

  /* apiKey: "AIzaSyB2A5Jz_s3zEl0f4MrKGrQpSdrG-gTnTX8",
  authDomain: "flat-camaleon.firebaseapp.com",
  projectId: "flat-camaleon",
  storageBucket: "flat-camaleon.appspot.com",
  messagingSenderId: "773881080940",
  appId: "1:773881080940:web:f155d35b0516021f6a7c49",
  measurementId: "G-WJK6YJVGGX" */