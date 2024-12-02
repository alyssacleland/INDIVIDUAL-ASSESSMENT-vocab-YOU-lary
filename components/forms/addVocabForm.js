import clearDom from '../../utils/clearDom';
import renderToDOM from '../../utils/renderToDom';
import selectLanguage from './selectLanguage';

const addVocabForm = (user, obj = {}) => {
  clearDom(); // below.. ternary. does it have a firebase key?  if yes, id is update-vocab--thefbkey. if no, id is submit-vocab for use itn payload for create vocab in form events.
  const domString = ` <form id="${obj.firebaseKey ? `update-vocab--${obj.firebaseKey}` : 'submit-vocab'}" class="mb-4"> 
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" aria-describedby="vocabTitle" placeholder="Enter Vocab Title" value="${obj.title || ''}" required>
      </div>
      <div class="form-group">
        <label for="definition">Definition</label>
        <textarea class="form-control" placeholder="Definition" id="definition" style="height: 100px">${obj.definition || ''}</textarea>
      <div class="form-group" id="select-language">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>`;

  renderToDOM('#form-container', domString);
  selectLanguage(`${obj.language || ''}`, user.uid); // takes obj.language if it has one, which would be the case for update. otherwise, takes empty string, which would be the case for create.
};

export default addVocabForm;
