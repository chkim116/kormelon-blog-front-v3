'use client';
import React, { MouseEventHandler, ReactNode } from 'react';
import { Divider, Link } from '@nextui-org/react';
import NextLink from 'next/link';
import { BlogDetailAnchorUiState } from '@domain/blog/detail/blogDetail.uiState';

interface BlogDetailContentNavigationProps {
  anchors: BlogDetailAnchorUiState[];
  activeId: string;
  actionContents: ReactNode;
  onClick: (id: string) => void;
}

export const BlogDetailContentNavigation = ({
  anchors,
  activeId,
  actionContents,
  onClick,
}: BlogDetailContentNavigationProps) => {
  const handleAnchorClickCurried =
    (id: string): MouseEventHandler<HTMLAnchorElement> =>
      (e) => {
      /**
       * 해시 조작으로 인한 스크롤 이동을 방지하고 외부로 위임하기 위함
       */
        e.preventDefault();
        onClick(id);
      };

  return (
    <>
      <p className="text-base font-bold uppercase tracking-widest text-primary-800">
        Table of Contents
      </p>
      <div className="relative mt-5">
        <ul className="h-full max-h-[50vh] overflow-y-auto space-y-5 pb-20">
          {anchors.map(({ id, value }) => (
            <li key={id}>
              <Link
                as={NextLink}
                href={id}
                onClick={handleAnchorClickCurried(id)}
                color={activeId === id ? 'primary' : 'foreground'}
                className="block text-base font-semibold"
              >
                {value}
              </Link>
            </li>
          ))}
        </ul>

        {actionContents && (
          <>
            <Divider />
            {actionContents}
          </>
        )}
      </div>
    </>
  );
};
