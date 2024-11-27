import firebase from 'firebase/app';
import 'firebase/auth';
import loginButton from '../components/buttoins/loginButton';
import logoutButton from '../components/buttoins/logoutButton';
import client from './client';

const ViewDirectorBasedOnUserAuthStatus = () => {
  firebase.initializeApp(client);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // person is logged in do something...
      // change below to startApp once I get there
      logoutButton();
    } else {
      // person is NOT logged in
      loginButton();
    }
  });
};

export default ViewDirectorBasedOnUserAuthStatus;
