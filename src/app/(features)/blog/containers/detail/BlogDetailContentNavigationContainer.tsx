'use client';
import {
  ReactNode,
  startTransition,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useDebounce } from 'use-debounce';
import { toString } from 'safers';
import { toBlogDetailAnchorUiStates } from '@domain/blog/detail/blogDetail.convert';
import {
  BlogDetailAnchorUiState,
  BlogDetailAnchorUiDto,
} from '@domain/blog/detail/blogDetail.uiState';
import { BlogDetailContentNavigation } from '@app/blog/components/detail/BlogDetailContentNavigation';

const DEFAULT_OFFSET_TOP = 100;

interface BlogDetailContentNavigationClientContainerProps {
  actionContents: ReactNode;
}

export const BlogDetailContentNavigationClientContainer = ({
  actionContents,
}: BlogDetailContentNavigationClientContainerProps) => {
  const [anchors, setAnchors] = useState<BlogDetailAnchorUiState[]>([]);
  const [activeId, setActiveId] = useState('');

  const selectHeadElements = () => {
    const elements =
      document?.getElementById('blogContent')?.querySelectorAll('h2') || [];

    return elements as NodeListOf<HTMLHeadingElement>;
  };

  const handleClickAnchor = (id: string) => {
    const target = anchors.find(({ id: anchorId }) => anchorId === id);

    if (target) {
      window.scrollTo({
        behavior: 'smooth',
        top: target.position - DEFAULT_OFFSET_TOP,
      });

      history.pushState(null, '', id);
    }
  };

  const [handleScroll] = useDebounce(() => {
    let currentId = '';

    anchors.forEach((element) => {
      if (scrollY >= element.position - DEFAULT_OFFSET_TOP) {
        currentId = element.id;
      }
    });

    setActiveId(currentId);
  }, 200);

  const calcAnchors = useCallback(() => {
    startTransition(() => {
      const elements = selectHeadElements();

      if (elements.length) {
        const heads: BlogDetailAnchorUiDto[] = [];
        elements.forEach(({ textContent, offsetTop }) => {
          heads.push({ textContent: toString(textContent), offsetTop });
        });

        setAnchors(toBlogDetailAnchorUiStates(heads));
      }
    });
  }, []);

  const [handleResize] = useDebounce(() => {
    calcAnchors();
  }, 100);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleResize, handleScroll]);

  useEffect(() => {
    calcAnchors();
  }, [calcAnchors]);

  return (
    <BlogDetailContentNavigation
      anchors={anchors}
      activeId={activeId}
      actionContents={actionContents}
      onClick={handleClickAnchor}
    />
  );
};
