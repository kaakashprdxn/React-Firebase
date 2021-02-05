import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

//this config is being used for both development and production environment. Though, it is a best practice creating a second project and have two configs: one for production (prodConfig) and another for development (devConfig), so you choose the config based on the environment.

const config = {
  apiKey: "AIzaSyAjVMbRa8lC7pQrO-fPT2pc3NdcbCD45pw",
  authDomain: "yourfitnessattorney-8e4bd.firebaseapp.com",
  projectId: "yourfitnessattorney-8e4bd",
  storageBucket: "yourfitnessattorney-8e4bd.appspot.com",
  databaseURL: "https://yourfitnessattorney-8e4bd-default-rtdb.firebaseio.com/",

  messagingSenderId: "848474457868",
  appId: "1:848474457868:web:0229a97fb99003354d2b29",
  measurementId: "G-TEY2EPFR2M",
};

if (!firebase.apps.length) {
  //initializing with the config object
  firebase.initializeApp(config);
}

//separting database API and authentication
const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();

const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { db, auth, facebookProvider, storage };
