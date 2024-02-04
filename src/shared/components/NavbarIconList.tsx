import NextLink from 'next/link';
import { Button } from '@nextui-org/button';
import { Github, Network, Rss, Tags } from 'lucide-react';

export function NavbarIconList() {
  return (
    <div className="flex gap-6">
      <Button isIconOnly size="sm" variant="light" as={NextLink} href="/tags">
        <Tags />
      </Button>
      <Button
        isIconOnly
        size="sm"
        variant="light"
        as={NextLink}
        href="/sitemap.xml"
      >
        <Network />
      </Button>
      <Button
        isIconOnly
        size="sm"
        variant="light"
        as={NextLink}
        target="_blank"
        href="https://github.com/chkim116"
      >
        <Github />
      </Button>
      <Button isIconOnly size="sm" variant="light" as={NextLink} href="/rss">
        <Rss />
      </Button>
    </div>
  );
}
