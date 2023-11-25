'use client';

import { Link, User } from '@nextui-org/react';
import {
  USER_NAME,
  USER_DESCRIPTION,
  USER_IMAGE,
} from '@shared/constants/user.const';
import { LucideIcon } from '@shared/components/common/Icon';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BlogDetailContentUserMetaProps {}

export function BlogDetailContentUserMeta(_: BlogDetailContentUserMetaProps) {
  return (
    <User
      name={
        <Link
          href="/"
          className="text-default-900 flex gap-1 items-center cursor-pointer"
        >
          {USER_NAME}
          <LucideIcon
            name="badge-check"
            size={18}
            className="fill-primary text-white mb-0.5"
            fontSize="small"
          />
        </Link>
      }
      description={USER_DESCRIPTION}
      classNames={{
        base: 'flex-col items-start gap-2 justify-center md:flex-row md:items-center px-2',
        name: 'text-xl md:text-2xl font-bold',
        description: 'mt-1 text-md md:text-lg text-default-600',
      }}
      avatarProps={{
        className: 'w-24 h-24 md:w-32 md:h-32',
        src: USER_IMAGE as unknown as string,
        alt: USER_NAME,
      }}
    />
  );
}
