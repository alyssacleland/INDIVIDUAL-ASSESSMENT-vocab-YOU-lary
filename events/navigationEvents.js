import addVocabForm from '../components/forms/addVocabForm';
import { vocabSearch } from '../api/vocabData';
import { emptyVocab, showVocab } from '../pages/vocab';

const navigationEvents = (user) => {
  // CLICK EVENT FOR CREATE ENTRY (to create new vocab)
  document.querySelector('#navigation').addEventListener('click', (e) => {
    if (e.target.id.includes('add-vocab-btn')) {
      addVocabForm(user);
      console.warn('clicked create entry');
    }
  });

  // SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => { // The keyup event is fired when a key is released.
    const searchValue = document.querySelector('#search').value.toLowerCase();
    console.warn(searchValue);

    // WHEN THE USER PRESSES ENTER, MAKE THE API CALL AND CLEAR THE INPUT
    if (e.keyCode) { // when key is pressed (changed this from when enter is pressed so that it searches as you type)
      // MAKE A CALL TO THE API TO FILTER ON THE BOOKS
      vocabSearch(user.uid, searchValue).then((result) => {
      // IF THE SEARCH DOESN'T RETURN ANYTHING, SHOW THE EMPTY STORE
        if (result.length === 0) {
          emptyVocab();
          // OTHERWISE SHOW THE STORE
        } else {
          showVocab(result);
        }
      });
    }
  });
  document.querySelector('#search').value = ''; // clears the searchbar input. but actually this is not happening and i'm not gonna worry about it because idk when i would want it to happen when i don't have enter key as the search trigger
};

export default navigationEvents;
