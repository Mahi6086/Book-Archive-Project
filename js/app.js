document.getElementById('error-message1').style.display = 'none';
document.getElementById('error-message2').style.display = 'none';
document.getElementById('spinner').style.display = 'none';

const searchInput = document.getElementById('search-input').addEventListener('click', function() {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //clean search field
    searchField.value = '';
    document.getElementById('searchbook-result').textContent = '';

    if (searchText === '') {
        // please write something to display
        displayError1();
    } else {
        // Display Spinner
        document.getElementById('spinner').style.display = 'block';
        // Hide error-messase-1
        document.getElementById('error-message1').style.display = 'none';
        // Hide error-messase-1
        document.getElementById('error-message2').style.display = 'none';
        // Clear Search Result
        document.getElementById('searchbook-result').textContent = '';
        //clear prievious Book numbers
        document.getElementById('book-numbers').textContent = '';

        //load data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        // console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data));
    }

});

//Display error-message-1
const displayError1 = () => {
    document.getElementById('error-message1').style.display = 'block';
    document.getElementById('error-message2').style.display = 'none';
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('book-numbers').textContent = '';

}

//Display error-message-2
const displayError2 = () => {
    document.getElementById('error-message1').style.display = 'none';
    document.getElementById('error-message2').style.display = 'block';
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('book-numbers').textContent = '';

}

/* Display Search Result */
const displaySearchResult = books => {
    document.getElementById('book-numbers').textContent = `Book Found ${books.numFound}`;

    //clear previous search result
    const searchResult = document.getElementById('searchbook-result');
    searchResult.textContent = '';
    // console.log(books);
    if (books.docs.length === 0) {
        displayError2();
    } else {
        document.getElementById('error-message2').style.display = 'none';
        document.getElementById('spinner').style.display = 'none';

        /* use for each loop
         Retrieve each book and display in a card */
        books.docs.forEach(book => {

            const divContainer = document.createElement('div');
            divContainer.classList.add('rounded-3');

            divContainer.innerHTML = `
        <div class="card h-100 border border-5 border-info bg-info">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top h-75" alt="...">
            <div class="card-body">
                <h3 class=""><span class="text-danger fw-bold">Books-Name:</span> ${book.title}</h3>
                <h4 class=""><span class="text-danger fw-bold">Author:</span> ${book.author_name}</h4>
                <h5 class=""><span class="text-danger fw-bold">First-Publish-Year:</span> ${book.first_publish_year}</h5>
                <h5 class=""><span class="text-danger fw-bold">Publisher:</span> ${book.publisher[0]}</h5>
            </div>
        </div>
        `
            searchResult.appendChild(divContainer);
        });
    }
}