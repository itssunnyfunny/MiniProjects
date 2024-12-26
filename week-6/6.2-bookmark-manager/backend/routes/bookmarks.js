let bookmarks = [];
let currentId = 1;


export async function addBookmark(req,res,next){
  try {
    const { category, url} = req.body;
         if (!category || !url) {
            return res.status(400).json({error: "Category and url is required"})
         }
    const newBookmark = {id: currentId++, category, url}
    bookmarks.push(newBookmark);
    res.json(newBookmark)
  } catch (error) {
    res.status(500).json({error: "an Error occured during adding a new Bookmark"})
  }
}

export async function deleteBookmark(req,res,next){
 try {
    const {id} = req.params;
    if (!id) {
     return res.status(401).json({error: "please provide id to delete the bookmark"})
    };
    const bookmarkIndex = bookmarks.findIndex(bookmark => bookmark.id == id);
    if (bookmarkIndex === -1) {
     return res.status(404).json({error: "Bookmark not found for the given id"})
    }
    bookmarks.splice(bookmarkIndex,1);
    res.json({message: "bookmark deleted successfully"});
 } catch (error) {
    return res.status(500).json({error: "an error occured during deleting bookmark !"})
 }
}

export async function getAllBookmarks(req,res,next){
    res.json(bookmarks);
}