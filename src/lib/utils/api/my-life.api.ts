import { TABLE } from '@/constants/supabase-tables-name';
import { createClient } from '@/lib/utils/supabase/supabase-server';
import type { LifePost } from '@/types/life-post';

const LIFE_POSTS_TABLE = TABLE.LIFE_POSTS;
/**
 * Supabase에서 `life_posts` 테이블의 `로그인 한 User`가 작성한 게시글을 조회하는 함수
 *
 * @function getAllLifePostsById
 * @returns {Promise<LifePost[]>} id, created_at, user_id, content, mission_id
 * @throws {Error} 데이터베이스 작업 중 오류가 발생하면 예외를 던집니다.
 */
export const getAllLifePostsById = async (): Promise<LifePost[]> => {
  const supabase = await createClient();
  //로그인한 유저 id 조회 (임시용)
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();
  if (!user) throw userError;

  //로그인 한 유저의 작성 게시글 조회
  // ascending 정렬 _ false 내림차순, true 오름차순 정렬
  const { data: MyLifePosts, error } = await supabase
    .from(LIFE_POSTS_TABLE)
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return MyLifePosts;
};

// lib/utils/api/life-post.api.ts

export const getLifePostById = async (id: number) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(LIFE_POSTS_TABLE)
    .select(
      `*, life_post_image_path (
        image_url
      )`
    )
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error('No data found');

  const processed = {
    ...data,
    image_urls: data.life_post_image_path?.map((img) => img.image_url) ?? []
  };

  return processed;
};
