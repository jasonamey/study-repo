import { useQuery } from 'react-query'
import { client } from 'utils/api-client'
import bookPlaceholderSvg from 'assets/book-placeholder.svg'


// function useBook(bookId, user) {
//   const {data} = useQuery({
//     queryKey: ['book', {bookId}],
//     queryFn: () =>
//       client(`books/${bookId}`, {token: user.token}).then(data => data.book),
//   })
//   return data ?? loadingBook

const loadingBook = {
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: bookPlaceholderSvg,
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  loadingBook: true,
}

const loadingBooks = Array.from({ length: 10 }, (v, index) => ({
  id: `loading-book-${ index }`,
  ...loadingBook,
}))


// const { data: book = loadingBook } = useQuery({
//   queryKey: ['book', { bookId }],
//   queryFn: () =>
//     client(`books/${ bookId }`, { token: user.token }).then(data => data.book),
// })

function useBook (bookId, user) {
  const data = useQuery({
    queryKey: ['book', { bookId }],
    queryFn: () =>
      client(`books/${ bookId }`, { token: user.token }).then(data => data.book),
  })
  return data ?? loadingBook
}

function useBookSearch (query, user) {
  const result = useQuery({
    queryKey: ['book-search', { query }],
    queryFn: () => client(`books?query=${ encodeURIComponent(query) }`, { token: user.token }).then(data => {
      console.log("data", data)
      return (data.books)
    })
  })

  return { ...result, books: result.data ?? loadingBooks }
}

export { useBook, useBookSearch }
