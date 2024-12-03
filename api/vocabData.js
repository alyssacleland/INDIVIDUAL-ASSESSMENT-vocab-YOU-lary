import client from '../utils/client';

const endpoint = client.databaseURL; // this is the same as dburl in postman. here it can be traced back to APP_DATABASE_URL in .env.

// GET VOCAB BY UID
const getVocab = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/vocab.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(async (data) => {
      if (data) {
        const vocabArray = Object.values(data); // converts the data object returned by the fetch call into an array

        const vocabWithLanguages = await Promise.all(vocabArray.map(async (vocab) => { // the function inside map() runs asynchronously for each item in the array. Promise.all() waits for all of them to finish before returning the result.
          const languageKey = vocab.language; // firebase key for the corresponding language

          // fetch the language data using the key
          const languageResponse = await fetch(`${endpoint}/languages/${languageKey}.json`); // fetches the actual language item
          const languageData = await languageResponse.json(); // takes the raw response body of languageResponse and parses it into a JavaScript object, which you can use in your code.

          // add the language name to the vocab item. jk eslint said no. instead, create a new obj based on the vocab and add the lang name
          const updatedVocab = { ...vocab, languageName: languageData ? languageData.title : 'Unkknown Language' }; // uses ternary. If languageName is truthy (is not null or undefined), then it assigns languageData.title to languageName. if it is falsy, then it assigns 'unknown language'
          // simpler (no ternary) for my understanding: sets languageName to languageData.title
          // languageData.title accesses the actual language name
          // ...vocab: spread operator: copies the vocab object and combines it with languageName
          // so we use xxx.languageName in our interpolation in vocab card to show the name, not the firebase key

          return updatedVocab; // return the updated vocab item with the language name
        }));

        resolve(vocabWithLanguages);
      } else {
        resolve([]); // handle a null value from the API when there are no Vocab in the database
      }
    })
    .catch(reject);
});

// GET VOCAB BY LANGUAGE (FILTER)
const filterVocabByLanguage = (uid, languageFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/vocab.json?orderBy="uid"&equalTo="${uid}"`, { // this is just getting all vocab by uid
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const filteredVocab = Object.values(data).filter((item) => item.language === languageFirebaseKey); // keeps only vocab items where the language matches the selected language key.

      return Promise.all( // Promise.all handles multiple asynchronous fetches for each vocab's language details
        filteredVocab.map((vocab) => fetch(`${endpoint}/languages/${vocab.language}.json`) // get the language name from its firebasekey
          .then((langResponse) => langResponse.json()) // put the language data in json format
          .then((languageData) => {
            const updatedVocab = {
              ...vocab,
              languageName: languageData ? languageData.title : 'Unknown Language' // assign language name
            };
            return updatedVocab;
          }))
      );
    })
    .then(resolve) // resolve with the updated vocab data
    .catch(reject); // catch any errors and reject the promise
});

// CREATE A VOCAB

const createVocab = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/vocab.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload), // puts the payload in a format compatile with firebase?
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// UPDATE A VOCAB
const updateVocab = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/vocab/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// DELETE A VOCAB
const deleteVocab = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/vocab/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getVocab, filterVocabByLanguage, createVocab, updateVocab, deleteVocab
};
// async: This keyword is used to define a function that will always return a Promise. Any function marked as async can use the await keyword inside it.

// await: Inside an async function, await is used to pause the function's execution until the Promise resolves (or rejects), essentially making it easier to work with asynchronous code.

// awaits looks cleaner then chaining a bunch of .then's

/// For example, when you call an asynchronous function like fetch(), it returns a Promise. If you use await with it, the code waits for the fetch() to finish before continuing.

// Promise.all() is a method that takes an array of Promises and returns a new Promise. This new Promise resolves when all the Promises in the array resolve, or it rejects as soon as one Promise rejects.
