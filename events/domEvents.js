import getSingleVocab from '../api/mergedData';
import { filterVocabByLanguage, getVocab, deleteVocab } from '../api/vocabData';
import { showVocab } from '../pages/vocab';
import addVocabForm from '../components/forms/addVocabForm';

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

  // higher order to target edit and delete events. i totally could have done this up there i think, but this is where we're at now:
  document.querySelector('#main-container').addEventListener('click', (e) => {
  // ******CLICK EVENT EDITING/UPDATING A VOCAB*******
    if (e.target.id.includes('edit-vocab-btn')) {
      console.warn('clicked edit button');
      const [, firebaseKey] = e.target.id.split('--'); // vocab card's edit button for reference: <a href="#" class="card-link" id="edit-vocab-btn--${vocab.firebaseKey}">Edit (placeholder)</a>
      // this assigns... firebaseKey = ${vocab.firebaseKey}
      // TLDR: get the firebaseKey of the vocab of the edit button pushed, then below, pass that into getSingleVocab fx
      getSingleVocab(firebaseKey).then((vocabObj) => addVocabForm(user, vocabObj));
    }
    // ******CLICK EVENT DELETING A VOCAB*******
    if (e.target.id.includes('delete-vocab-btn')) {
      // if (window.confirm('Want to delete?')) {
      const [, firebaseKey] = e.target.id.split('--'); // see note on update above for explanation on this destructuring
      deleteVocab(firebaseKey).then(() => {
        getVocab(user.uid).then(showVocab);
      });
      // }
    }
  });
  // close out highest order
};
export default domEvents;
