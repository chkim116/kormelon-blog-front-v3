'use client';
import NextLink from 'next/link';
import { Button } from '@nextui-org/react';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import GitHub from '@mui/icons-material/GitHub';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import SellRoundedIcon from '@mui/icons-material/SellRounded';

export function LayoutIconList() {
  return (
    <div className="flex gap-6">
      <Button isIconOnly size="sm" variant="light" as={NextLink} href="/tags">
        <SellRoundedIcon />
      </Button>
      <Button
        isIconOnly
        size="sm"
        variant="light"
        as={NextLink}
        href="/sitemap.xml"
      >
        <AccountTreeRoundedIcon />
      </Button>
      <Button
        isIconOnly
        size="sm"
        variant="light"
        as={NextLink}
        target="_blank"
        href="https://github.com/chkim116"
      >
        <GitHub />
      </Button>
      <Button isIconOnly size="sm" variant="light" as={NextLink} href="/rss">
        <RssFeedRoundedIcon />
      </Button>
    </div>
  );
}
