import client from '../utils/client';

const endpoint = client.databaseURL; // this is the same as dburl in postman. here it can be traced back to APP_DATABASE_URL in .env.

// GET LANGUAGES
const getLanguages = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/languages.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data)); // converts the data object returned by the fetch call into an array
      } else {
        resolve([]); // handle a null value from the API when there are no Vocab in the database
      }
    })
    .catch(reject);
});

// DELETE LANGUAGE... PROB WON'T ACTUALLY USE! Added for deleting relationship, but i don't think i need to do that now
const deleteSingleLanguage = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/languages/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export { getLanguages, deleteSingleLanguage };
