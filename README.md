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

### Getting started
- Create query client
    - Client that manages queries and cache
- Apply QueryProvider
    - Provides cache and client config to children
    - Tales query client as the value
- UseQuery hook
    - Hook that queries data from server

### isFetching vs isLoading
- isFetching: the async query faction hasn't resolved yet
- isLoading: the async query function hasn't resolved yet and the data is not in the cache yet

### React Query Devtools
- Shows queries (by key)
    - Status of queries
    - Last updated timestamp
- Data explorer
- Query explorer
- https://react-query.tanstack.com/devtools

### stale time vs cache time
why does it matter if the data is stale

Data refetch only triggers for stale data
    - For example, component remount, window refocus
    - StaleTime translates to max age
    - how to tolarate data potentially being out of date(we can set staleTime to 10 second to always refetch data)
    - So if anything happened that would ordinarily cause a refetch, but the data is not stale(fresh), then react query will not refetch the data, it will only be launched if the data is stale

- staleTime: how long to consider data fresh
- staleTIme is for re-fetching
- cacheTime is for garbage collection

- cache is for data that might be re used later
    - query goes into 'cold storage' if there's no active useQuery
    - cache data expires after cacheTime (default 5 minutes)
        - how long it's been since the last active useQuery
    - After the cache expires, the data os garbage collected
- Cache is backup data to display while fetching