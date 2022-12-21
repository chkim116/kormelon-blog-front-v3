import { feedbackService } from '@common/components';
import { useAppDispatch, useAppSelector } from '@common/store';
import { BlogPrivatePost } from '@features/blog/components/private';
import {
  effBlogPostDelete,
  effBlogPrivatePostsLoad,
  selBlogPostLoading,
  selBlogPrivatePostTotalCount,
  selBlogPrivatePosts,
} from '@features/blog/stores';

export const BlogPrivatePostContainer = () => {
  const privatePosts = useAppSelector(selBlogPrivatePosts);
  const privateTotal = useAppSelector(selBlogPrivatePostTotalCount);
  const loading = useAppSelector(selBlogPostLoading);

  const dispatch = useAppDispatch();

  const handleDelete = (id: number) => {
    if (window.confirm('삭제하십니까?')) {
      dispatch(effBlogPostDelete(id))
        .unwrap()
        .then(() => {
          feedbackService('success', '삭제 성공');
          dispatch(effBlogPrivatePostsLoad()).unwrap();
        })
        .catch((err) => feedbackService('success', err.message));
    }
  };

  return (
    <BlogPrivatePost
      loading={loading}
      privatePosts={privatePosts}
      privateTotal={privateTotal}
      onDelete={handleDelete}
    />
  );
};
