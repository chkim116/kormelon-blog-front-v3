'use client';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { toString } from 'safers';
import { toBlogDetailAnchorUiStates } from '@features/blog/domains/detail/blogDetail.convert';
import {
  BlogDetailAnchorUiState,
  BlogDetailAnchorUiDto,
} from '@features/blog/domains/detail/blogDetail.uiState';
import { BlogDetailContentNavigation } from '@features/blog/components/detail/BlogDetailContentNavigation';

const DEFAULT_OFFSET_TOP = 100;

interface BlogDetailContentNavigationClientContainerProps {
  actionContents: ReactNode;
}

export const BlogDetailContentNavigationClientContainer = ({
  actionContents,
}: BlogDetailContentNavigationClientContainerProps) => {
  const [anchors, setAnchors] = useState<BlogDetailAnchorUiState[]>([]);
  const [activeId, setActiveId] = useState('');

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

  const calcAnchors = useCallback(() => {
    const selectHeadElements = () => {
      const elements =
        document?.getElementById('blogContent')?.querySelectorAll('h2') || [];

      return elements as NodeListOf<HTMLHeadingElement>;
    };

    const elements = selectHeadElements();

    if (elements.length) {
      const heads: BlogDetailAnchorUiDto[] = [];
      elements.forEach(({ textContent, offsetTop }) => {
        heads.push({ textContent: toString(textContent), offsetTop });
      });

      setAnchors(toBlogDetailAnchorUiStates(heads));
    }
  }, []);

  const [handleResize] = useDebounce(() => {
    calcAnchors();
  }, 100);

  const [handleScroll] = useDebounce(() => {
    let currentId = '';

    if (anchors.length === 0) {
      calcAnchors();
    }

    anchors.forEach((element) => {
      if (scrollY >= element.position - DEFAULT_OFFSET_TOP) {
        currentId = element.id;
      }
    });

    setActiveId(currentId);
  }, 200);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleResize, handleScroll]);

  return (
    <BlogDetailContentNavigation
      anchors={anchors}
      activeId={activeId}
      actionContents={actionContents}
      onClick={handleClickAnchor}
    />
  );
};
