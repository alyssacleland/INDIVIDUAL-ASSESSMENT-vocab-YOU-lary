import { createVocab, getVocab, updateVocab } from '../api/vocabData';
import { showVocab } from '../pages/vocab';

const formEvents = (user) => {
  document.querySelector('#main-container').addEventListener('submit', (e) => {
    e.preventDefault();

    // CLICK EVENT FOR SUBMITTING FORM FOR ADDING A VOCAB
    if (e.target.id.includes('submit-vocab')) { // formEvents > addVocabForm will have the id submit-vocab if there is no firebaseKey yet, which is for create vocab
      const payload = {
        title: document.querySelector('#title').value,
        definition: document.querySelector('#definition').value,
        language: document.querySelector('#language').value, // there is an id for this in the addVocabForm, but that is rendered in via the selectVocab Function
        public: false,
        time_submitted: new Date().toISOString(),
        uid: user.uid
      };
      // add firebase key to the payload after it is created
      createVocab(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateVocab(patchPayload).then(() => {
          getVocab(user.uid).then(showVocab);
        });
      });
    }

    // to do: CLICK EVENT FOR SUBMITTING FORM FOR EDITING A VOCAB
    if (e.target.id.includes('update-vocab')) { // addVocabForm will have the id update-vocab if a firebaseKey exists (see ternary there)
      const [, firebaseKey] = e.target.id.split('--'); // comments in domEvents explain this destructuring process further if needed
      const payload = {
        title: document.querySelector('#title').value,
        definition: document.querySelector('#definition').value,
        language: document.querySelector('#language').value, // there is an id for this in the addVocabForm, but that is rendered in via the selectVocab Function
        public: false,
        time_submitted: new Date().toISOString(),
        firebaseKey,
      };
      // add firebase key to the payload after it is created
      updateVocab(payload).then(() => {
        getVocab(user.uid).then(showVocab);
      });
    }
    // don't mess with below
  });
};

export default formEvents;
