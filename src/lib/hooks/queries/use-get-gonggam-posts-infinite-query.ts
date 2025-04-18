import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-keys';
import { getMyGonggamPostsAll } from '@/lib/utils/api/my-gonggam-client.api';
import type { GetMyGonggamPostsResponse, SortBy } from '@/types/gonggam-posts';

/**
 * @function useGetGonggamPostsInfiniteQuery
 * @returns - pageParams, pages 을 반환,
 */
export const useGetGonggamPostsInfiniteQuery = (sortBy: SortBy) => {
  return useInfiniteQuery<GetMyGonggamPostsResponse>({
    queryKey: QUERY_KEY.GONGGAM_POSTS_INFINITE(sortBy),
    queryFn: async ({ pageParam = 1 }) => getMyGonggamPostsAll({ page: pageParam as number, sortBy }),
    getNextPageParam: (lastPage) => (lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined),
    initialPageParam: 1
  });
};

export default useGetGonggamPostsInfiniteQuery;
