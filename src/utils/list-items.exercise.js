import { useQuery } from 'react-query'
import { client } from './api-client.exercise'


function useListItem (user, bookId) {
  const listItems = useListItems(user)
  return listItems.find(li => li.bookId === bookId) ?? null
}

function useListItems (user) {
  const items = useQuery({
    queryKey: 'list-items',
    queryFn: () => client('list-items', { token: user.token }).then(data => data.listItems)
  })
  return items ?? []
}

export { useListItem, useListItems }