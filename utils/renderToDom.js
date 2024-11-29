const renderToDOM = (divId, content) => {
  document.querySelector(divId).innerHTML = content;
};

export default renderToDOM;
