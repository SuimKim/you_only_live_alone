export const QUERY_KEY = {
  PROFILE: ['profile'],
  LIFE_POSTS_INFINITE: ['life-posts-infinite'],
  LIFE_POSTS: (month?: string) => (month ? ['life-posts', month] : ['life-posts'])
};
