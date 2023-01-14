import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box } from '@mui/material';
import copy from 'copy-to-clipboard';
import { feedbackService } from '@common/components/Feedback';
import { STORAGE_LIKE_KEY } from '@common/constants';
import { useAppDispatch, useAppSelector } from '@common/store';
import { tokenProvider } from '@core/tokenProvider';
import { useQueryPush } from '@shared/hooks';
import { intersectionObserver } from '@shared/utils';
import { selUserData } from '@shared/stores/auth';
import {
  PostContent,
  PostContentFooter,
  PostDetailHeader,
  PostFloating,
  PostThumbnail,
} from '@features/blog/components/detail';
import { createContentAnchorPositionMap } from '@features/blog/manipulates/blog.create';
import {
  BlogPostAnchorModel,
  BlogPostDetailModel,
} from '@features/blog/models';
import {
  effBlogPostAddView,
  effBlogPostDelete,
  effBlogPostLike,
} from '@features/blog/stores';
import { extractHeadingText } from '@features/blog/manipulates';

interface BlogPostDetailContainerProps {
  post: BlogPostDetailModel;
}

export const BlogPostDetailContainer = ({
  post,
}: BlogPostDetailContainerProps) => {
  const {
    category,
    content,
    createdAt,
    id,
    view,
    preview,
    readTime,
    tags,
    thumbnail,
    title,
    user,
  } = post;
  const dispatch = useAppDispatch();
  const router = useQueryPush();

  const { id: userId } = useAppSelector(selUserData);

  const refContentBoundary = useRef<HTMLDivElement>(null);
  const tick = useRef<NodeJS.Timer | null>(null);

  const [anchors, setAnchors] = useState<BlogPostAnchorModel[]>([]);
  const [farAwayHeight, setFarAwayHeight] = useState(0);

  const anchorPosition = useMemo(
    () => createContentAnchorPositionMap(anchors, farAwayHeight),
    [anchors, farAwayHeight],
  );

  const [activeAnchorId, setActiveAnchorId] = useState('');
  const [isMove, setIsMove] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const getFarAwayHeight = useCallback((element: HTMLElement) => {
    if (!element?.offsetHeight) {
      return;
    }

    const HEADER_HEIGHT = 64;

    setFarAwayHeight(HEADER_HEIGHT + element.offsetHeight);
  }, []);

  const handleScroll = useCallback(() => {
    if (!anchorPosition || isMove) {
      return;
    }

    const entriesAnchorPosition = Object.entries(anchorPosition);

    const res = entriesAnchorPosition
      .filter(([_, value]) => scrollY >= value)
      .map(([key]) => key);

    setActiveAnchorId(res[res.length - 1]);
  }, [anchorPosition, isMove]);

  const handleAnchorClick = useCallback(
    (id: string) => {
      if (!anchorPosition) {
        return;
      }

      setActiveAnchorId(id);
      setIsMove(true);

      history.pushState(null, '', '#' + id);
      scrollTo({
        behavior: 'smooth',
        top: anchorPosition[id],
      });

      if (tick.current) {
        clearInterval(tick.current as NodeJS.Timer);
      }

      tick.current = setInterval(() => {
        if (anchorPosition[id] === window.scrollY) {
          setIsMove(false);
        }
      }, 25);
    },
    [anchorPosition],
  );

  const handleShare = () => {
    try {
      copy(window.location.href);
      feedbackService('success', 'Copied to clipboard!');
    } catch (err) {
      feedbackService('error', '다시 시도해 주세요.');
    }
  };

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    dispatch(effBlogPostLike(id))
      .unwrap()
      .catch((err) => feedbackService('error', err.message));
  };

  const handleDelete = (id: number) => {
    if (window.confirm('삭제하십니까?')) {
      dispatch(effBlogPostDelete(id))
        .unwrap()
        .then(() => {
          router({
            categoryId: category.id,
            subCategoryId: category.subCategoryId,
          });
        });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    setIsLiked(!!tokenProvider().get<number[]>(STORAGE_LIKE_KEY)?.includes(id));
  }, [id]);

  useEffect(() => {
    intersectionObserver(refContentBoundary.current, { threshold: 0 }, () => {
      setAnchors(extractHeadingText());
      dispatch(effBlogPostAddView(id));
    });
  }, [dispatch, id]);

  return (
    <Box position="relative" maxWidth="xl" m="0 auto" component="article">
      <Box ref={getFarAwayHeight}>
        <PostDetailHeader
          id={id}
          preview={preview}
          tags={tags}
          title={title}
          createdAt={createdAt}
          user={user}
          isAuthor={user.id === userId}
          readTime={readTime}
          category={category}
          onDelete={handleDelete}
        />

        <PostThumbnail src={thumbnail} alt={`${title} thumbnail`} />
      </Box>

      <Box
        position="relative"
        maxWidth="md"
        m="0 auto"
        ref={refContentBoundary}
      >
        <PostContent content={content} />
        <Box
          position="absolute"
          top={0}
          right="-230px"
          width="200px"
          height="100%"
        >
          <PostFloating
            activeAnchorId={activeAnchorId}
            anchors={anchors}
            isLiked={isLiked}
            onAnchorClick={handleAnchorClick}
            onShare={handleShare}
            onLike={handleLike}
          />
        </Box>
      </Box>

      <PostContentFooter
        view={view}
        isLiked={isLiked}
        onLike={handleLike}
        onShare={handleShare}
      />
    </Box>
  );
};
