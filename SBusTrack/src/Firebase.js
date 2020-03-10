import firebase from "firebase";

const config = {
    apiKey: "AIzaSyDu4GG136sUl00diYvzYWdIcQitY_yeTb8",
    authDomain: "driverapp-dd386.firebaseapp.com",
    databaseURL: "https://driverapp-dd386.firebaseio.com",
    projectId: "driverapp-dd386",
    storageBucket: "driverapp-dd386.appspot.com",
    messagingSenderId: "1031062502613",
    appId: "1:1031062502613:web:335885dd3651f7bbf3b65c",
    measurementId: "G-GY3J262ZXV"
};

firebase.initializeApp(config);
export default firebase;