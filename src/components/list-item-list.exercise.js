/** @jsx jsx */
import { jsx } from '@emotion/core'

// 🐨 you'll need useQuery from 'react-query'
// 🐨 and client from 'utils/api-client'
import { useQuery } from 'react-query'
import { client } from 'utils/api-client'
import { BookListUL } from './lib'
import { BookRow } from './book-row'
import { useListItems } from 'utils/list-items.exercise'

function ListItemList ({
  user,
  filterListItems,
  noListItems,
  noFilteredListItems,
}) {
  // 🐨 call useQuery to get the list-items from the 'list-items' endpoint
  // queryKey should be 'list-items'
  // queryFn should call the 'list-items' endpoint

  const { data: listItems } = useListItems(user)

  // const { data: listItems } = useQuery({
  //   queryKey: 'list-items',
  //   queryFn: () =>
  //     client('list-items', { token: user.token }).then(data => data.listItems),
  // })



  // 🐨 assign this to the list items you get back from react-query
  // const listItems = null
  // console.log(listItems)
  // const { listItems } = data
  const filteredListItems = listItems?.filter(filterListItems)

  if (!listItems?.length) {
    return <div css={ { marginTop: '1em', fontSize: '1.2em' } }>{ noListItems }</div>
  }
  if (!filteredListItems.length) {
    return (
      <div css={ { marginTop: '1em', fontSize: '1.2em' } }>
        { noFilteredListItems }
      </div>
    )
  }

  return (
    <BookListUL>
      { filteredListItems.map(listItem => (
        <li key={ listItem.id }>
          <BookRow user={ user } book={ listItem.book } />
        </li>
      )) }
    </BookListUL>
  )
}

export { ListItemList }
