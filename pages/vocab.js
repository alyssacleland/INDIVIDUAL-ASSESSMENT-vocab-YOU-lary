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
    <h6 class="card-subtitle mb-2 text-body-secondary">need to do merged promsie, rn is the firebase key: ${vocab.language}</h6>
    <p class="card-text">${vocab.definition}</p>
    <a href="#" class="card-link">Edit (placeholder)</a>
    <a href="#" class="card-link">Delete (placeholder)</a>
  </div>
</div>`;
    });
    renderToDOM('#store', domString);
  }
};

// todo: 1. the buttons. ohhh boy. and 2. display the language. see merged promises in amazon. authorobject.

export { emptyVocab, showVocab };
