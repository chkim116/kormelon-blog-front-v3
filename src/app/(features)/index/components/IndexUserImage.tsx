'use client';
import VerifiedIcon from '@mui/icons-material/Verified';
import Image from 'next/image';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IndexUserImageProps {}

export const IndexUserImage = (_: IndexUserImageProps) => (
  <div className="flex flex-col items-center justify-center">
    <Image
      src="/my.jpg"
      alt=""
      width={96}
      height={96}
      className="rounded-full"
    />
    <h2 className="flex gap-1 items-center mt-4 text-lg">
      김창회
      <VerifiedIcon color="primary" fontSize="small" />
    </h2>
    <h2 className="mt-4">
      유지보수 좋은 소프트웨어 개발에 관심이 많은 프론트엔드 개발자, 지금
      레벨13에서 일하고 있습니다.
    </h2>
  </div>
);
