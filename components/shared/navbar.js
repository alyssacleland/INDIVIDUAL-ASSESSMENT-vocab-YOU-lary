import renderToDOM from '../../utils/renderToDom';

const navBar = () => {
  const domString = `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">LOGO</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link" href="#" id="add-vocab-btn">Create Entry</a>
          <a class="nav-link disabled" aria-disabled="true">Create Language</a>
          <a class="nav-link disabled" aria-disabled="true">Community</a>
        </div>
        <div class="container-fluid">
  <form class="d-flex" role="search">
    <input class="form-control me-2" id="search" type="search" placeholder="Search" aria-label="Search">
  </form>
  </div>
              <div id="logout-button"></div>
      </div>
    </div>
</nav>`;

  renderToDOM('#navigation', domString);
};

export default navBar;
