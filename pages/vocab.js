import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const emptyVocab = () => {
  const domString = '<h1>No Vocab</h1>';
  renderToDOM('#store', domString);
};

const showVocab = (array) => {
  clearDom();

  if (array.length === 0) {
    emptyVocab(); // if the array is empty, display "No Vocab"
  } else {
    // if the array is not empty, loop through the vocab items
    let domString = '';
    array.forEach((vocab) => {
      domString += `<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${vocab.title}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">${vocab.languageName}</h6>
    <p class="card-text">${vocab.definition}</p>
    <a href="#" class="card-link" id="edit-vocab-btn--${vocab.firebaseKey}">Edit</a>
    <a href="#" class="card-link" id="delete-vocab-btn--${vocab.firebaseKey}">Delete</a>
  </div>
</div>`;
    });
    renderToDOM('#store', domString);
  }
};

export { emptyVocab, showVocab };
