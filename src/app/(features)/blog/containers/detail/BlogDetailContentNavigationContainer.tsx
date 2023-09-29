'use client';
import { ReactNode, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { extractHeadingText } from '@domain/manipulates';
import { BlogPostAnchorModel } from '@domain/uiStates';
import { BlogDetailContentNavigation } from '@app/blog/components/detail';

const DEFAULT_OFFSET_TOP = 100;

interface BlogDetailContentNavigationClientContainerProps {
  actionContents: ReactNode;
}

export const BlogDetailContentNavigationClientContainer = ({
  actionContents,
}: BlogDetailContentNavigationClientContainerProps) => {
  const [anchors, setAnchors] = useState<BlogPostAnchorModel[]>([]);
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

  const [handleScroll] = useDebounce(() => {
    let currentId = '';

    anchors.forEach((element) => {
      if (scrollY >= element.position - DEFAULT_OFFSET_TOP) {
        currentId = element.id;
      }
    });

    setActiveId(currentId);
  }, 200);

  const [handleResize] = useDebounce(() => {
    setAnchors(extractHeadingText());
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
    setAnchors(extractHeadingText());
  }, []);

  return (
    <BlogDetailContentNavigation
      anchors={anchors}
      activeId={activeId}
      actionContents={actionContents}
      onClick={handleClickAnchor}
    />
  );
};
