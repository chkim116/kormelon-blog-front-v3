import { useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import copy from 'copy-to-clipboard';
import { useRouter } from 'next/router';
import { feedbackService } from '@common/components/Feedback';
import { STORAGE_LIKE_KEY } from '@common/constants';
import { useAppDispatch } from '@common/store';
import { tokenProvider } from '@core/tokenProvider';
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
  const router = useRouter();

  const [anchors, setAnchors] = useState<BlogPostAnchorModel[]>([]);
  const anchorPosition = createContentAnchorPositionMap(anchors);

  const tick = useRef<NodeJS.Timer | null>(null);
  const [activeAnchorId, setActiveAnchorId] = useState('');
  const [isMove, setIsMove] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const [farAwayHeight, setFarAwayHeight] = useState(0);

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
      .catch((err) => feedbackService('error', err.response?.data.message));
  };

  const handleDelete = (id: number) => {
    if (window.confirm('삭제하십니까?')) {
      dispatch(effBlogPostDelete(id))
        .unwrap()
        .then(() => {
          router.push(
            `/blog?categoryId=${category.id}&subCategoryId=${category.subCategoryId}`,
          );
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
    // TODO: 조회 중복 체크하기
    dispatch(effBlogPostAddView(id));
  }, [dispatch, id]);

  useEffect(() => {
    setTimeout(() => {
      setAnchors(extractHeadingText());
    }, 1000);
  }, []);

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
          readTime={readTime}
          category={category}
          onDelete={handleDelete}
        />

        <PostThumbnail src={thumbnail} alt={`${title} thumbnail`} />
      </Box>

      <Box maxWidth="md" m="0 auto">
        <PostContent content={content} />

        <Box
          position="absolute"
          top={`${farAwayHeight}px`}
          right="1%"
          width="204px"
          height={`calc(100% - ${farAwayHeight}px)`}
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
