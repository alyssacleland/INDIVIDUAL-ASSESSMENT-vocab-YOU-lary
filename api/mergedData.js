import client from '../utils/client';
// import { deleteSingleLanguage } from './languagesData';

const endpoint = client.databaseURL;

// GET SINGLE VOCAB
const getSingleVocab = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/vocab/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject);
});

export default getSingleVocab;

// delete languages Vocab relationship... actually i don't need this yet. not unless i get to the point of deleting languages. i don't think deleting a vocab will delete the associated language.
// const deleteLanguagesVoacbRelationship = (firebaseKey) => new Promise((resolve, reject) => {
//   getLanguageVocab(firebaseKey).then((languageVocabArray) => {
//     const deleteVocabPromises = languageVocabArray.map((vocab) => deleteVocab(vocab.firebaseKey));

//     Promise.all(deleteVocabPromises).then(() => {
//       deleteSingleLanguage(firebaseKey).then(resolve);
//     });
//   }).catch(reject);
// });
