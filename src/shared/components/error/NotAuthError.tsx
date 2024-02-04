'use client';

import { Button, Link, Spacer } from '@nextui-org/react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NotAuthErrorProps {}

export function NotAuthError(_: NotAuthErrorProps) {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-dark">
      <h1 className="text-9xl font-extrabold text-light tracking-widest">
        401
      </h1>
      <div className="bg-warning text-light px-2 text-sm rounded rotate-12 absolute">
        NOT AUTHENTICATED
      </div>

      <div className="flex">
        <Button as={Link} href="/" className="mt-5" variant="solid">
          Back to Home
        </Button>
        <Spacer />
        <Button
          as={Link}
          href="/login"
          className="mt-5"
          color="primary"
          variant="solid"
        >
          Go to Login
        </Button>
      </div>
    </div>
  );
}
