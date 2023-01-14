import { useRef, useCallback, useEffect } from 'react';
import { Box, Divider } from '@mui/material';
import { useAppSelector, useAppDispatch } from '@common/store';
import { effNotificationRead } from '@shared/stores/notification';
import { intersectionObserver } from '@shared/utils';
import {
  effBlogPostCommentsLoad,
  selBlogPostComments,
} from '@features/blog/stores';
import { useBlogPostDetailCommentParamsCtx } from '@features/blog/contexts';
import { BlogPostCommentBodyContainer } from './BlogPostCommentBodyContainer';
import { BlogPostCommentCreatorContainer } from './BlogPostCommentCreatorContainer';
import { BlogPostCommentReplyContainer } from './BlogPostCommentReplyContainer';

export const BlogPostCommentContainer = () => {
  const postComments = useAppSelector(selBlogPostComments);
  const dispatch = useAppDispatch();

  const { postId, notificationId } = useBlogPostDetailCommentParamsCtx();

  const refCommentElement = useRef<HTMLDivElement>(null);

  const handleNotificationRead = useCallback(() => {
    if (notificationId) {
      dispatch(effNotificationRead(Number(notificationId))).unwrap();
    }
  }, [dispatch, notificationId]);

  const handleCommentLoad = useCallback(() => {
    intersectionObserver(refCommentElement.current, { threshold: 0.1 }, () => {
      dispatch(effBlogPostCommentsLoad(postId)).unwrap();
    });
  }, [dispatch, postId]);

  useEffect(handleNotificationRead, [handleNotificationRead]);
  useEffect(handleCommentLoad, [handleCommentLoad]);

  return (
    <Box maxWidth="md" m="0 auto" pb={24} pt={2} px={2} ref={refCommentElement}>
      <BlogPostCommentCreatorContainer postId={postId} />

      {postComments.map(
        ({
          commentReplies,
          createdAt,
          id,
          isAnonymous,
          userId,
          username,
          value,
          userProfile,
          deletedAt,
        }) => (
          <>
            <BlogPostCommentBodyContainer
              key={id}
              postId={postId}
              userProfile={userProfile}
              commentId={id}
              commentReplies={commentReplies}
              createdAt={createdAt}
              deletedAt={deletedAt}
              isAnonymous={isAnonymous}
              commentValue={value}
              username={username}
              commentAuthorId={userId}
            />
            <BlogPostCommentReplyContainer
              postId={postId}
              userId={userId}
              commentId={id}
              replies={commentReplies}
            />
            <Divider sx={{ pb: 2, mb: 2 }} />
          </>
        ),
      )}
    </Box>
  );
};
