'use client';

import { toast } from '@shared/services/ToastService';
import { useFormActionState } from '@shared/hooks/useFormActionState';
import { actBlogDetailDeleteBlog } from '@features/blog/actions/blogDetail.action';
import { BlogPrivatePost } from '@features/blog/components/private/BlogPrivatePost';
import { BlogSearchPrivateUiState } from '@features/blog/domains/search/blogSearch.uiState';

interface BlogPrivatePostContainerClientProps {
  blogs: BlogSearchPrivateUiState[];
  total: number;
}

export const BlogPrivatePostContainerClient = ({
  blogs,
  total,
}: BlogPrivatePostContainerClientProps) => {
  const { formAction } = useFormActionState(actBlogDetailDeleteBlog, {
    onSuccess() {
      toast.open('success', '게시글이 삭제 되었습니다.');
    },
    revalidate: true,
  });

  const handleDelete = async (id: number) => {
    if (window.confirm('삭제하십니까?')) {
      await formAction(id);
    }
  };

  return (
    <BlogPrivatePost
      privatePosts={blogs}
      privateTotal={total}
      onDelete={handleDelete}
    />
  );
};
