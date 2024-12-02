import domBuilder from '../components/shared/domBuilder';
import navBar from '../components/shared/navbar';
import { getVocab } from '../api/vocabData';
import { showVocab } from '../pages/vocab';
import getLanguages from '../api/languagesData';
import { showLanguages } from '../pages/languages';
import domEvents from '../events/domEvents';
import formEvents from '../events/formEvents';
import navigationEvents from '../events/navigationEvents';

const startApp = (user) => {
  domBuilder(user);
  navBar();
  navigationEvents(user);
  formEvents(user);
  getVocab(user.uid).then((vocab) => showVocab(vocab));
  getLanguages(user.uid).then((language) => {
    showLanguages(language);
    domEvents(user);
  });
};

export default startApp;
