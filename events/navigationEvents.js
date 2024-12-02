import addVocabForm from '../components/forms/addVocabForm';

const navigationEvents = (user) => {
  document.querySelector('#navigation').addEventListener('click', (e) => {
    // CLICK EVENT FOR CREATE ENTRY (to create new vocab)
    if (e.target.id.includes('add-vocab-btn')) {
      addVocabForm(user);
      console.warn('clicked create entry');
    }
  });
};

export default navigationEvents;
