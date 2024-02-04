'use client';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CommonErrorProps {
  text: string;
}

export function CommonError({ text }: CommonErrorProps) {
  return (
    <div className="flex justify-center items-center w-full h-[80vh]">
      <h1 className="text-2xl">{text}</h1>
    </div>
  );
}
