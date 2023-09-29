import { useAppDispatch, useAppSelector } from '@shared/stores';
import { toast } from '@shared/services';
import { BlogPrivatePost } from '@app/blog/components/private';
import {
  effBlogPostDelete,
  effBlogPrivatePostsLoad,
  selBlogPostLoading,
  selBlogPrivatePostTotalCount,
  selBlogPrivatePosts,
} from '@app/blog/stores';

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
          toast.open('success', '삭제 성공');
          dispatch(effBlogPrivatePostsLoad()).unwrap();
        })
        .catch((err) => toast.open('success', err.message));
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
