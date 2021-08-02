import firebase from 'firebase/app'
import 'firebase/auth';
import "firebase/firestore";
import "firebase/storage"
// import 'firebase/storage'

const firebaseApp=firebase.initializeApp(
  {
    apiKey: "AIzaSyBSqoZuOiHO4M5PUuH1BidDOjUV6yGf3oc",
    authDomain: "my-movie-1f5cc.firebaseapp.com",
    databaseURL:"gs://my-movie-1f5cc.appspot.com",
    projectId: "my-movie-1f5cc",
    storageBucket: "my-movie-1f5cc.appspot.com",
    messagingSenderId: "638400974941",
    appId: "1:638400974941:web:372fe98082e8adfa64fdb4"
  }
);

  // Initialize Firebase

  //firebase.initializeApp(firebaseConfig);
  
  export default firebase;
  export const db=firebaseApp.firestore();
  export const storage=firebaseApp.storage();
  export const auth = firebaseApp.auth(); 
  export const authGoogle = new firebase.auth.GoogleAuthProvider()



 




