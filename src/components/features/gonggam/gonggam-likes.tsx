'use client';

import { useEffect, useState } from 'react';
import { toastAlert } from '@/lib/utils/toast';
import { MSG } from '@/constants/messages';
import { Heart } from 'lucide-react';
import clsx from 'clsx';
import {
  dislikePost,
  getLikeCountClient,
  getUserLikedStatus,
  likePost
} from '@/lib/utils/api/gonggam-detail-client.api';
import type { Tables } from '@/types/supabase';

interface GonggamLikesProps {
  postId: number;
  initProfile: Tables<'users'>;
}

const GonggamLikes = ({ postId, initProfile }: GonggamLikesProps) => {
  const [likeCnt, setLikeCnt] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isLikePending, setIsLikePending] = useState<boolean>(false);

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const likeCnt = await getLikeCountClient(postId);
        setLikeCnt(likeCnt);
      } catch (err) {
        console.error(MSG.FAIL_TO_GET_POST_META, err);
      }
    };
    fetchMeta();
    const fetchLikeStatus = async () => {
      if (!initProfile.id) return;
      try {
        const liked = await getUserLikedStatus({ postId, userId: initProfile.id });
        setIsLiked(liked);
      } catch (err) {
        console.error('좋아요 상태 조회 실패:', err);
      }
    };
    fetchLikeStatus();
  }, []);

  const handleLikeToggle = async () => {
    if (!initProfile.id) return;
    setIsLikePending(true);
    try {
      if (isLiked) {
        await dislikePost({ postId, userId: initProfile.id });
        setLikeCnt((prev) => prev - 1);
        setIsLiked(false);
      } else {
        await likePost({ postId });
        setLikeCnt((prev) => prev + 1);
        setIsLiked(true);
      }
    } catch (err) {
      toastAlert(MSG.FAIL_TO_UPDATE_LIKE, 'destructive');
      console.error(err);
    } finally {
      setIsLikePending(false);
    }
  };

  return (
    <div>
      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <button
          onClick={handleLikeToggle}
          disabled={isLikePending}
          className="flex items-center gap-2 rounded-md border border-gray-500 p-2 transition-colors hover:text-primary"
        >
          <Heart
            size={14}
            className={clsx('transition-colors', {
              'fill-red-500 text-red-500': isLiked,
              'text-gray-400': !isLiked
            })}
          />
          <span>{likeCnt}</span>
        </button>
      </div>
    </div>
  );
};

export default GonggamLikes;
