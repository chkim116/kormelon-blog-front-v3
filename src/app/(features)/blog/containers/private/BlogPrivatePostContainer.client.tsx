'use client';

import { BlogSearchPrivateUiState } from '@domain/blog/search/blogSearch.uiState';
import { toast } from 'src/app/shared/services/ToastService';
import { useFormActionState } from 'src/app/shared/hooks/useFormActionState';
import { actBlogDetailDeleteBlog } from '@app/blog/actions/blogDetail.action';
import { BlogPrivatePost } from '@app/blog/components/private/BlogPrivatePost';

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
