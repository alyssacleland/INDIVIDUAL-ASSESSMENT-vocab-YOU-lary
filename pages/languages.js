// import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const emptyLanguages = () => {
  const domString = '<h1>No Languages</h1>';
  renderToDOM('#languages-container', domString);
};

const showLanguages = (array) => {
  // clearDom();

  if (array.length === 0) {
    emptyLanguages(); // if the array is empty, display "No Vocab"
  } else {
    // if the array is not empty, loop through the vocab items
    let domString = '';
    array.forEach((language) => {
      domString += `<button type="button" class="btn btn-outline-success language-button" id="${language.firebaseKey}">${language.title}</button>`;
    });
    // Add the "Show All" button after the languages
    domString += `
        <button type="button" class="btn btn-outline-dark" id="show-all-btn">Show All</button>
      `;

    renderToDOM('#languages-container', domString);
  }
};

export { emptyLanguages, showLanguages };
