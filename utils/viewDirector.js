import firebase from 'firebase/app';
import 'firebase/auth';
import loginButton from '../components/buttons/loginButton';
import logoutButton from '../components/buttons/logoutButton';
import client from './client';
import startApp from './startApp';

const ViewDirectorBasedOnUserAuthStatus = () => {
  firebase.initializeApp(client);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // person is logged in do something...
      // change below to startApp once I get there
      startApp(user);
      logoutButton();
    } else {
      // person is NOT logged in
      loginButton();
    }
  });
};

export default ViewDirectorBasedOnUserAuthStatus;
