import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  //On previous or next button click goes to the corresponding page
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  //Genereates next button in the search results container
  _generateNextButton(currentPage) {
    return `<button data-goto="${
      currentPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
  }

  //Genereates the previous button in the search results container
  _generatePreviousButton(currentPage) {
    return `<button data-goto="${
      currentPage - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
    </button>`;
  }

  // Generates either the previous, next or both buttons depending on what page the user is on in the search results container
  _generateMarkup() {
    const currentPage = +this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //Page 1, and there are more pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateNextButton(currentPage);
    }
    //Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generatePreviousButton(currentPage);
    }
    //Other page
    if (currentPage < numPages) {
      return (
        this._generatePreviousButton(currentPage) +
        this._generateNextButton(currentPage)
      );
    }
    //Page 1, no other pages
    return '';
  }
}

export default new PaginationView();
