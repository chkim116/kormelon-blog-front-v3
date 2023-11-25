'use client';
import NextLink from 'next/link';
import { Button } from '@nextui-org/react';
import { LucideIcon } from '@shared/components/common/Icon';

export function NavbarIconList() {
  return (
    <div className="flex gap-6">
      <Button isIconOnly size="sm" variant="light" as={NextLink} href="/tags">
        <LucideIcon name="tags" />
      </Button>
      <Button
        isIconOnly
        size="sm"
        variant="light"
        as={NextLink}
        href="/sitemap.xml"
      >
        <LucideIcon name="network" />
      </Button>
      <Button
        isIconOnly
        size="sm"
        variant="light"
        as={NextLink}
        target="_blank"
        href="https://github.com/chkim116"
      >
        <LucideIcon name="github" />
      </Button>
      <Button isIconOnly size="sm" variant="light" as={NextLink} href="/rss">
        <LucideIcon name="rss" />
      </Button>
    </div>
  );
}
