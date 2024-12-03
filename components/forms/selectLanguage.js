import getLanguages from '../../api/languagesData';
import renderToDOM from '../../utils/renderToDom';

const selectLanguage = (languageId) => { // languageID OR blank string
  let domString = `<label language">Select a language</label>
    <select class="form-control" id="language" required>
    <option value="">Select a language</option>`;

  // loop thru the languages
  getLanguages().then((languagesArray) => { // get languages expects a string (uid), not an entire object (user)
    languagesArray.forEach((language) => {
      domString += `
          <option 
            value="${language.firebaseKey}" 
            ${languageId === language.firebaseKey ? 'selected' : ''}> 
              ${language.title}
          </option>`;
    });
    // value is the firebasekey of the lang bc we access it via .value, but what is shown is the langugage title?
    // ${languageId === language.firebaseKey ? 'selected' : ''}> ... i think this line is spefifying what do do if it is updating a card (already 'selected') or creating ('')
    domString += '</select>';

    renderToDOM('#select-language', domString);
  });
};

export default selectLanguage;
