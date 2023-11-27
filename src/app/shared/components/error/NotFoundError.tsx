'use client';

import { Button } from '@nextui-org/react';
import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NotFoundErrorProps {}

export function NotFoundError(_: NotFoundErrorProps) {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-dark">
      <h1 className="text-9xl font-extrabold text-light tracking-widest">
        404
      </h1>
      <div className="bg-warning text-light px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>

      <Button
        as={Link}
        href="/"
        className="mt-5"
        color="primary"
        variant="solid"
      >
        Back to Home
      </Button>
    </div>
  );
}
