import domBuilder from '../components/shared/domBuilder';
import navBar from '../components/shared/navbar';
import getVocab from '../api/vocabData';
import { showVocab } from '../pages/vocab';
import getLanguages from '../api/languagesData';
import { showLanguages } from '../pages/languages';

const startApp = (user) => {
  domBuilder(user);
  navBar();
  getVocab(user.uid).then((vocab) => showVocab(vocab));
  getLanguages(user.uid).then((language) => showLanguages(language));
};

export default startApp;
