import { Button } from '@nextui-org/button';
import { Avatar } from '@nextui-org/avatar';
import { AtSign, Github } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IndexUserMenuProps {}

const INDEX_USER_MENU_LIST = [
  {
    text: 'Personal Blog',
    href: '/blog',
    icon: <Avatar src="/my.jpg" className="w-[1.875rem] h-[1.875rem]" />,
    isExternal: true,
  },
  {
    text: 'Github',
    href: 'https://github.com/chkim116',
    icon: <Github className="text-3xl" />,
    isExternal: true,
  },
  {
    text: 'Email',
    href: 'mailto:cskim132@gmail.com',
    icon: <AtSign name="at-sign" className="text-3xl" />,
    isExternal: false,
  },
];

export const IndexUserMenu = (_: IndexUserMenuProps) => (
  <div className="flex flex-col items-center justify-center w-full p-2 sm:p-8 gap-4 max-w-lg">
    {INDEX_USER_MENU_LIST.map(({ href, icon, text, isExternal }) => (
      <Button
        key={text}
        size="lg"
        variant="bordered"
        fullWidth
        className="relative hover:scale-105"
        href={href}
        target={isExternal ? '_blank' : '_self'}
        as="a"
      >
        <div className="absolute left-4">{icon}</div>
        {text}
      </Button>
    ))}
  </div>
);
