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
// write here
}

export async function getAllBookmarks(req,res,next){
// write here
}