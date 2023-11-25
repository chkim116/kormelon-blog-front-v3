'use client';
import Image from 'next/image';
import {
  USER_IMAGE,
  USER_NAME,
  USER_DESCRIPTION,
} from '@shared/constants/user.const';
import { LucideIcon } from '@shared/components/common/Icon';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IndexUserImageProps {}

export const IndexUserImage = (_: IndexUserImageProps) => (
  <div className="flex flex-col items-center justify-center">
    <Image
      src={USER_IMAGE}
      alt=""
      width={96}
      height={96}
      className="rounded-full"
    />
    <h2 className="flex gap-1 items-center mt-4 text-lg">
      {USER_NAME}
      <LucideIcon
        name="badge-check"
        size={18}
        className="fill-primary text-white mb-0.5"
        fontSize="small"
      />
    </h2>
    <h2 className="mt-4">{USER_DESCRIPTION}</h2>
  </div>
);
