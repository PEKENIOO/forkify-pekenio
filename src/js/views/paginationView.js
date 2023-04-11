import View from './View';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _currentPage;

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn--inline');

        if(!btn) return;
        const goToPage = +btn.dataset.goto;

        handler(goToPage);
    });
  }

  _generateMarkup() {
    this._currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // page 1, and others
    if (this._currentPage === 1 && numPages > 1) {
      return `${this._generateMarkupPagesInfo(this._currentPage, numPages)}${this._generateMarkupNextButton()}`;
    }

    // last page
    if (numPages > 1 && this._currentPage === numPages) {
      return `${this._generateMarkupPreviewButton()}${this._generateMarkupPagesInfo(this._currentPage, numPages)}`;
    }

    // others page
    if (this._currentPage < numPages) {
      return `${this._generateMarkupPreviewButton()}${this._generateMarkupPagesInfo(this._currentPage, numPages)}${this._generateMarkupNextButton()}`;
    }

    // only 1 page
    return `${this._generateMarkupPagesInfo(this._currentPage, numPages)}`;
  }

  _generateMarkupPreviewButton() {
    return `
    <button data-goto="${this._currentPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._currentPage - 1}</span>
    </button>
    `;
  }

  _generateMarkupNextButton() {
    return `
    <button data-goto="${this._currentPage + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${this._currentPage + 1}</span>
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
    `;
  }

  _generateMarkupPagesInfo(current, last) {
    return `
    <p class="pages">${current} of ${last} pages</p>
    `
  }
}

export default new paginationView();
