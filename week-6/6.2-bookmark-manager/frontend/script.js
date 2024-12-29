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
    const bookmarkList = document.getElementById('bookmark-list');

    const bookmarkItem = document.createElement('li');
    bookmarkItem.setAttribute('bookmark-id', bookmark.id);
    bookmarkItem.classList.add('bookmark-item');

    const url = document.createElement('span');
    url.textContent = `${bookmark.url} (${bookmark.catogary})`;

    const deleteBookmark = document.createElement('button');
    deleteBookmark.textContent = 'Delete';
    deleteBookmark.addEventListener('click', ()=> deleteBookmark(bookmark.id));

    bookmarkItem.appendChild(url);
    bookmarkItem.appendChild(deleteBookmark);

    bookmarkList.appendChild(bookmarkItem);
}

// Add a new bookmark
document.getElementById('add-bookmark-btn').addEventListener('click', () => {
      //  start here
});

// Delete a bookmark
function deleteBookmark(id) {
     //  start here;
}