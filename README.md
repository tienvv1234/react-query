### Client state vs Server state
- Client state: information relevant to browser session
    example: User's chosen language or theme
- Server state: information stored on the server
    example: User's shopping cart

### What problem does react Query solve?
- React Query maintains cache of server data on client

### React Query manages data
- Indicate when to update cache with new data from server
    - Imperatively: invalidate data (refetch data from server)
    - Or declaratively: configure how data is updated(e.g window focus & when to trigger a re-fetch)

### Plus...
- Loading / error states
    - It maintains loading and error states for every query to the server so that you don't have to do that
- Pagination
    - It gives you tools to fetch data in pieces just when it's needed by user for pagination of the data
- Prefetching
    - You can prefetch data before it's needed by user
- Mutations
    - It gives you tools to update data on the server
- De-duplicating requests
    - Since queries are identified by a key react query can manage your requests so that if you load a page and several components on that page request the same data, react query can send the query only once and if another component requests the data while that originla query is going out, then react query can de-duplicate the requests
- Retry on error
- Callback
