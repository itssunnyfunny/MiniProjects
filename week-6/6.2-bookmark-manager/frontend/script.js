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
    url.textContent = `${bookmark.url} (${bookmark.category})`;

    const deleteBookmark = document.createElement('button');
    deleteBookmark.textContent = 'Delete';
    deleteBookmark.addEventListener('click', ()=> deleteBookmark(bookmark.id));

    bookmarkItem.appendChild(url);
    bookmarkItem.appendChild(deleteBookmark);

    bookmarkList.appendChild(bookmarkItem);
}

// Add a new bookmark
document.getElementById('add-bookmark-btn').addEventListener('click', () => {
      const urlInput = document.getElementById('bookmark-url');
      const categoryInput = document.getElementById('bookmark-category');

      if (!urlInput || !categoryInput ||urlInput.value.trim() === '' || categoryInput.value.trim() === '') {
        console.error('provide both url and category')
        return;
      };

      const newBookmark = {url: urlInput.value, category: categoryInput.value};

      fetch(API_URL, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBookmark)
      })
      .then(response => response.json())
      .then(bookmark => {
        addBookmarkToDOM(bookmark)
        urlInput.value = '';
        categoryInput.value = '';
    })
      .catch(error => console.error("Error during adding new bookmark",error))
});

// Delete a bookmark
function deleteBookmark(id) {
    fetch(`${API_URL}/${id}`,{
        method: 'DELETE'
    })
    .then(()=>{
        const bookmarkItem = document.querySelector(`[bookmark-id='${id}']`)
        bookmarkItem.remove();
    })
    .catch(error => console.error("error during deleting a bookmark"))
}