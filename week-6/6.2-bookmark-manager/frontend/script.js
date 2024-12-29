const API_URL = 'http://localhost:3001/bookmarks';

// Fetch bookmarks when the page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchBookmarks()
});

// Fetch bookmarks from the backend
function fetchBookmarks() {
    fetch(`${API_URL}`)
    .then(response => response.json())
    .then(bookmarks => bookmarks.forEach(bookmark => {
        addBookmarkToDOM(bookmark)
    }))
    .catch(error => console.error("error during getting all the bookmarks"))
}

// Add a bookmark to the DOM
function addBookmarkToDOM(bookmark) {
    //  start here
}

// Add a new bookmark
document.getElementById('add-bookmark-btn').addEventListener('click', () => {
      //  start here
});

// Delete a bookmark
function deleteBookmark(id) {
     //  start here;
}