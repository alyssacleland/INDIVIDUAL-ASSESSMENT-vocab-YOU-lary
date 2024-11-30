import domBuilder from '../components/shared/domBuilder';
import navBar from '../components/shared/navbar';
import getVocab from '../api/vocabData';
import { showVocab } from '../pages/vocab';

const startApp = (user) => {
  domBuilder(user);
  navBar();
  getVocab(user.uid).then((vocab) => showVocab(vocab));
};

export default startApp;
