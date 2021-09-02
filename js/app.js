const searchInput = document.getElementById('search-input').addEventListener('click', function() {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    //load data
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.docs));
});

/* Display Search Result */
const displaySearchResult = books => {
    const searchResult = document.getElementById('searchBookResult');
    /* use for each loop
     Retrieve each book and display in a card */
    books.forEach(book => {
        document.getElementById('book-numbers').innerHTML = `Book Found ${books.length}`;
        const divContainer = document.createElement('div');
        divContainer.classList.add('col');

        divContainer.innerHTML = `
        <div class="card h-100">
            <img class="h-75" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top h-75" alt="...">
            <div class="card-body">
                <h3 class="">Books-Name: ${book.title}</h3>
                <h4 class="">Author: ${book.author_name}</h4>
                <h5 class="">First-Publish-Year: ${book.first_publish_year}</h5>
                <h5 class="">Publisher: ${book.publisher}</h5>
            </div>
        </div>
        `
        searchResult.appendChild(divContainer);
    });
};