import { filterVocabByLanguage, getVocab } from '../api/vocabData';
import { showVocab } from '../pages/vocab';

const domEvents = (user) => { // higher order function that accepts user and sets up other functions to use this arg
// *******LANGUGAGE BUTTONS**********
  document.querySelectorAll('.language-button').forEach((button) => {
    button.addEventListener('click', (event) => {
      const languageFirebaseKey = event.target.id;
      console.warn('CLICKED A LANGUAGE BUTTON');

      filterVocabByLanguage(user.uid, languageFirebaseKey).then((filteredVocab) => showVocab(filteredVocab));
    });
  });

  // *******SHOW ALL BUTTON**********
  document.getElementById('show-all-btn').addEventListener('click', () => {
    // Call the startApp function to re-render everything, showing all cards
    getVocab(user.uid).then((vocab) => showVocab(vocab));
  });

  // to do: ******CLICK EVENT EDITING/UPDATING A VOCAB*******
};

export default domEvents;
