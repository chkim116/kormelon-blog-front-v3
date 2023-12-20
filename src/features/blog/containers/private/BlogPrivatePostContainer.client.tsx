'use client';

import { actBlogDetailDeleteBlog } from '@features/blog/actions/blogDetail.action';
import { BlogPrivatePost } from '@features/blog/components/private/BlogPrivatePost';
import { BlogSearchPrivateUiState } from '@features/blog/domains/search/blogSearch.uiState';
import { toast } from '@shared/services/ToastService';
import { useFormActionState } from '@shared/hooks/useFormActionState';

interface BlogPrivatePostContainerClientProps {
  blogs: BlogSearchPrivateUiState[];
  total: number;
}

export const BlogPrivatePostContainerClient = ({
  blogs,
  total,
}: BlogPrivatePostContainerClientProps) => {
  const { formAction } = useFormActionState(actBlogDetailDeleteBlog, {
    onSuccess(_) {
      toast.open('success', '게시글이 삭제 되었습니다.');
    },
    onError({ message }) {
      toast.open('error', message);
    },
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
