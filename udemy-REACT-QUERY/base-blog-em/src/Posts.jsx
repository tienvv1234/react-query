import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { PostDetail } from './PostDetail';
const maxPostPage = 10;

async function fetchPosts(pageNumber) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNumber}`
    );
    return response.json();
}

export function Posts() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPost, setSelectedPost] = useState(null);

    // note that we can not use useQueryClient hook in onClick function because
    // the setState is asynchonous, so won't really know whether or not this update has takes effect yet
    // we don't have a good deterministic way to know what the current page is, we should use useEffect
    const queryClient = useQueryClient();

    useEffect(() => {
        if (currentPage > maxPostPage) {
            const nextPage = currentPage + 1;
            queryClient.prefetchQuery(['posts', nextPage], () =>
                fetchPosts(nextPage)
            );
        }
    }, [currentPage, queryClient]);

    // replace with useQuery
    const { data, isLoading, isError, error, isFetching } = useQuery(
        ['posts', currentPage],
        () => fetchPosts(currentPage),
        {
            staleTime: 1000 * 5, // set to 2 seconds (default is 1 second) fresh 2 seconds => stale
            keepPreviousData: true,
        }
    );
    console.log(data, isLoading, isError, error);
    if (isFetching) {
        // this isFetching will display loading spinner regardless of whether data is cached or not
        return <div>Loading...</div>;
    }
    // if (isLoading) {
    //   // if there was nothing in the cache, we were getting the date from server
    //   return <div>Loading...</div>;
    // }
    if (isError) {
        return <div>{error.message}</div>;
    }

    return (
        <>
            <ul>
                {data.map((post) => (
                    <li
                        key={post.id}
                        className='post-title'
                        onClick={() => setSelectedPost(post)}
                    >
                        {post.title}
                    </li>
                ))}
            </ul>
            <div className='pages'>
                <button
                    disabled={currentPage <= 1}
                    onClick={() => {
                        setCurrentPage((previousValue) => previousValue - 1);
                    }}
                >
                    Previous page
                </button>
                <span>Page {currentPage}</span>
                <button
                    disabled={currentPage >= maxPostPage}
                    onClick={() => {
                        setCurrentPage((previousValue) => previousValue + 1);
                    }}
                >
                    Next page
                </button>
            </div>
            <hr />
            {selectedPost && <PostDetail post={selectedPost} />}
        </>
    );
}
