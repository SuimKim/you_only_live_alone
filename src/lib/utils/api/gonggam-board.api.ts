import { TABLE } from '@/constants/supabase-tables-name';
import { createClient } from '@/lib/utils/supabase/supabase-server';
import type {
  GonggamCategory,
  GonggamPost,
  GonggamPostMeta,
  PaginatedPostsResponse,
  WriterProfileResponse
} from '@/types/gonggam';
import type { GonggamPostWithReaction } from '@/types/gonggam-posts';
import type { Tables } from '@/types/supabase';

const PAGE_SIZE = 5; // 페이지당 보여줄 게시글 수

/** getPaginatedGonggamPosts
 * 공감 게시글을 카테고리별 + 페이지네이션 기반으로 조회하는 함수
 *
 * @param category - 게시글 카테고리 (예: 일상공유, 꿀팁공유 등)
 * @param page - 현재 페이지 번호 (기본값: 1)
 * @returns posts: 해당 페이지의 게시글 목록
 *          pagination: 현재 페이지, 전체 페이지 수, 전체 게시글 수
 */
export const getPaginatedGonggamPosts = async (
  category: GonggamCategory,
  page: number = 1
): Promise<PaginatedPostsResponse> => {
  const supabase = await createClient();

  // Step 1: 전체 개수 카운트
  const { count, error: countError } = await supabase
    .from(TABLE.GONGGAM_POSTS)
    .select('*', { count: 'exact' }) // count만 select
    .eq('category', category);

  if (countError && !count) throw new Error(countError.message);

  const totalCount = count ?? 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  // Step 2: 해당 페이지 데이터 조회
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data: posts, error: postsError } = await supabase
    .from(TABLE.GONGGAM_POSTS)
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (postsError) throw new Error(postsError.message);

  return {
    posts: posts ?? [],
    pagination: {
      currentPage: page,
      totalPages,
      totalCount
    }
  };
};

/** getWriterProfile
 * 작성자의 프로필 정보를 조회하는 함수(id, 닉네임, 프로필 이미지)
 *
 * @param writerId - 조회할 작성자의 고유 ID
 * @returns id, nickname, profile_image_url
 */
export const getWriterProfile = async (writerId: Tables<'users'>['id']): Promise<WriterProfileResponse> => {
  const supabase = await createClient();
  const { data: profile, error: userErr } = await supabase
    .from(TABLE.USERS)
    .select('id,nickname, profile_image')
    .eq('id', writerId)
    .single();
  if (userErr) throw new Error(userErr.message);
  return {
    id: profile.id,
    nickname: profile.nickname,
    profileImage: profile.profile_image
  };
};

/** getPostImagesByPostId
 * 특정 게시글(post_id)에 연결된 이미지 URL 배열을 조회합니다.
 *
 * @param postId 게시글 ID
 * @returns 이미지 URL 문자열 배열 (없으면 빈 배열)
 */
export const getPostImagesByPostId = async (postId: GonggamPost['id']): Promise<string[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from(TABLE.GONGGAM_POST_IMAGE_PATH).select('image_url').eq('post_id', postId);

  if (error || !data) return [];

  return data.map((item) => item.image_url);
};

/** getPostMetaByPostId
 * 특정 post_id에 대한 좋아요 수와 댓글 수를 반환합니다.
 *
 * @param postId - 게시글 ID
 * @returns { likeCnt, commentCnt }
 */
export const getPostMetaByPostId = async (postId: GonggamPost['id']): Promise<GonggamPostMeta> => {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc('get_post_meta', { post_id: postId });

  if (error || !data || data.length === 0) {
    return { likeCnt: 0, commentCnt: 0 };
  }

  return {
    likeCnt: data[0].likes_count ?? 0,
    commentCnt: data[0].comments_count ?? 0
  };
};

/**
 * public.gonggam_posts 테이블에서 조회수 높은순 3개의 공감 게시글을 불러옵니다.
 * @returns { Promise<GonggamPost[]> } 공감 게시글 배열
 */
export const getGonggamPreviewList = async (): Promise<GonggamPostWithReaction[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from(TABLE.GONGGAM_POSTS)
    .select('*, likes(*), comments(*)')
    .order('view_count', { ascending: false })
    .limit(3);

  if (error) throw error;

  return data ?? [];
};

/**
 * 선택한 게시글의 조회수를 서버에서 받아오는 api 함수입니다.
 * @param { string } postId - 선택한 게시글의 id
 * @returns { number } - 선택한 게시글의 조회수
 */
export const getViewCount = async (postId: string): Promise<number> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from(TABLE.GONGGAM_POSTS)
    .select('view_count')
    .eq('id', Number(postId))
    .single();

  if (error) throw error;

  return data.view_count;
};
