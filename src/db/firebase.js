import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {

  apiKey: "AIzaSyA1WWg8DHyaWe3k0Ggiu2K9M-8kRuk6PiM",
  authDomain: "tally-356508.firebaseapp.com",
  projectId: "tally-356508",
  storageBucket: "tally-356508.appspot.com",
  messagingSenderId: "333706786409",
  appId: "1:333706786409:web:ad1db5a8775596e26d54f8",
  measurementId: "G-PGM9YSHVEL"
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()

export const firestore = firebase.firestore()
export const storage = firebase.storage()
var provider = new firebase.auth.GoogleAuthProvider(); 
export {auth , provider};