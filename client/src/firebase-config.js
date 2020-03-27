import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDsUnEtA7BCHsgyrx5wuCtHWp7S9J6CvZo",
    authDomain: "projetmobileweb.firebaseapp.com",
    databaseURL: "https://projetmobileweb.firebaseio.com",
    projectId: "projetmobileweb",
    storageBucket: "projetmobileweb.appspot.com",
    messagingSenderId: "970008391314",
    appId: "1:970008391314:web:5437b2200a983eb763404b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var storage = firebase.storage();

export {
    storage, firebase as default
};