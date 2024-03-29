'use client';
import { Link, LinkProps } from '@nextui-org/react';
import NextLink from 'next/link';

interface NavbarMenuLinkProps extends LinkProps {
  label: string;
  href: string;
  isActive: boolean;
  isExternal: boolean;
}

export function NavbarMenuLink({
  href,
  isActive,
  isExternal,
  label,
  ...props
}: NavbarMenuLinkProps) {
  const color = isActive ? 'warning' : 'foreground';

  const linkProps: LinkProps = {
    color,
    ...props,
    ...(isExternal && {
      target: '_blank',
      rel: 'noopener noreferrer',
      showAnchorIcon: true,
    }),
    ...(isActive && { 'aria-current': 'page' }),
  };

  return (
    <Link as={NextLink} className="w-full" href={href} size="lg" {...linkProps}>
      {label}
    </Link>
  );
}
