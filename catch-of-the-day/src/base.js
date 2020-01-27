import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA6YlkdJddTdcpoVrBJMlhIxyLlImGVdLI",
  authDomain: "catch-of-the-day-tim-316c5.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-tim-316c5.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

//this is a named export
export { firebaseApp };

export default base;