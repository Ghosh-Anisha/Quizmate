import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
    // apiKey: "AIzaSyB7zTYmhFI7Ygvhf_f1VTHTWAAGN9VlJoI",
    // authDomain: "forms-clone-127b9.firebaseapp.com",
    // projectId: "forms-clone-127b9",
    // storageBucket: "forms-clone-127b9.appspot.com",
    // messagingSenderId: "356296216795",
    // appId: "1:356296216795:web:df779d62a4322f75a43cfe"

    apiKey: "AIzaSyA1WWg8DHyaWe3k0Ggiu2K9M-8kRuk6PiM",
  authDomain: "tally-356508.firebaseapp.com",
  projectId: "tally-356508",
  storageBucket: "tally-356508.appspot.com",
  messagingSenderId: "333706786409",
  appId: "1:333706786409:web:ad1db5a8775596e26d54f8",
  measurementId: "G-PGM9YSHVEL"
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()

export const firestore = firebase.firestore()
export const storage = firebase.storage()