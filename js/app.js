document.getElementById('error-message').style.display = 'none';
document.getElementById('spinner').style.display = 'none';

const searchInput = document.getElementById('search-input').addEventListener('click', function() {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //clean search field
    searchField.value = '';
    document.getElementById('searchbook-result').textContent = '';

    if (searchText === '') {
        // please write something to display
        displayError();
    } else {
        // Display Spinner
        document.getElementById('spinner').style.display = 'block';
        // Hide error
        document.getElementById('error-message').style.display = 'none';
        // Clear Search Result
        document.getElementById('searchbook-result').textContent = '';
        //clear prievious Book numbers
        document.getElementById('book-numbers').textContent = '';

        //load data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        // console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs));
    }

});

const displayError = () => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('book-numbers').textContent = '';

}

/* Display Search Result */
const displaySearchResult = books => {
    // clear team previous team number
    // document.getlementById('book-numbers').textContent = '';

    //clear previous search result
    const searchResult = document.getElementById('searchbook-result');
    searchResult.textContent = '';
    // console.log(books);
    if (books.length === 0) {
        displayError();
    } else {
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('spinner').style.display = 'none';

        /* use for each loop
         Retrieve each book and display in a card */
        books.forEach(book => {
            document.getElementById('book-numbers').textContent = `Book Found ${books.length}`;

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
    }
}