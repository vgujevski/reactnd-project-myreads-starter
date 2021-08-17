export const getBookData = (book) => {
  const appBook = {
    id: book.id,
    imageLink: book.imageLinks.thumbnail,
    authors: book.authors,
    title: book.title,
    shelf: book.shelf
  }
  
  return appBook
}