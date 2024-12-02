import { filterVocabByLanguage } from '../api/vocabData';
import { showVocab } from '../pages/vocab';

const domEvents = (user) => { // higher order function that accepts user and sets up other functions to use this arg
// LANGUGAGE BUTTONSs
  document.querySelectorAll('.language-button').forEach((button) => {
    button.addEventListener('click', (event) => {
      const languageFirebaseKey = event.target.id;
      console.warn('CLICKED A LANGUAGE BUTTON');

      filterVocabByLanguage(user.uid, languageFirebaseKey).then((filteredVocab) => showVocab(filteredVocab));
    });
  });
};

export default domEvents;
