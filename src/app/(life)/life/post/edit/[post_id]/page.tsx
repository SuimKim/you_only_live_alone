// app/life/post/edit/[post_id]/page.tsx

import PostInputForm from '@/components/common/post-input-form';
import { getLifePostById } from '@/lib/utils/api/my-life.api';

interface PageProps {
  params: { post_id: string };
}

const Page = async ({ params }: PageProps) => {
  const postId = Number(params.post_id);
  const post = await getLifePostById(postId);

  return (
    <PostInputForm
      isEditMode
      missionId={post.mission_id?.toString() ?? null}
      defaultValues={{
        id: post.id,
        title: post.title,
        content: post.content,
        tags: post.tags ?? [],
        date: post.date,
        imageUrls: post.image_urls ?? [],
        missionId: post.mission_id ?? undefined
      }}
    />
  );
};

export default Page;
