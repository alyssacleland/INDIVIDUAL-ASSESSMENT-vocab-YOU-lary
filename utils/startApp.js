import domBuilder from '../components/shared/domBuilder';
import navBar from '../components/shared/navbar';

const startApp = (user) => {
  domBuilder(user);
  navBar();
};

export default startApp;
