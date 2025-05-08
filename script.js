function searchContacts() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultsDiv = document.getElementById('results');
    
    
    // Show loading indicator
    resultsDiv.innerHTML = '';
    
    // Fetch data from the JSON endpoint
    fetch('https://mjoyyy19.github.io/authors/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
           
            if (!searchTerm) {
                resultsDiv.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-info-circle"></i>
                        <h5>Please enter a name to search</h5>
                    </div>
                `;
                return;
            }
            
            // Convert single contact object to array for consistent processing
            const books = Array.isArray(data) ? data : [data];
            
            const filteredBooks = books.filter(book => 
                book.title && book.title.toLowerCase().includes(searchTerm) ||
                book.author && book.author.toLowerCase().includes(searchTerm) ||
                book.genre && book.genre.toLowerCase().includes(searchTerm)

            );
            
            displayResults(filteredBooks);
        })
        .catch(error => {
            resultsDiv.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-exclamation-triangle text-danger"></i>
                    <h5>Error loading books</h5>
                    <p class="text-muted">${error.message}</p>
                </div>
            `;
            console.error('Error fetching data:', error);
        });
}

function displayResults(books) {
    const resultsDiv = document.getElementById('results');
    
    if (books.length === 0) {
        resultsDiv.innerHTML = `
            <div class="no-results">
                <i class="fas fa-user-slash"></i>
                <h5>No books found</h5>
                <p class="text-muted">Try a different search term</p>
            </div>
        `;
        return;
    }
    
    let html = `
        <table class="table contact-table table-hover">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    books.forEach(book => {
        html += `
            <tr>
                <td>
                    <strong>${book.title || 'N/A'}</strong>
                </td>
                <td>
                    ${book.author ? `<div><i class="fas fa-envelope me-2 text-primary"></i> ${book.author}</div>` : ''}
                </td>
                <td>
                    ${book.genre ? `<div><i class="fas fa-phone me-2 text-primary"></i> ${book.genre}</div>` : ''}
                </td>
                <td>
                <td>
                    <div>${book.available ? 'Available' : 'Not Available'}</div>
                </td>

                </td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
    `;
    
    resultsDiv.innerHTML = html;
}
