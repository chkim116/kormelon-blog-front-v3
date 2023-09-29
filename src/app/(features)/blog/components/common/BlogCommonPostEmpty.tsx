'use client';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BlogCommonPostEmptyProps {}

export function BlogCommonPostEmpty(_: BlogCommonPostEmptyProps) {
  return (
    <section className="max-w-5xl w-full mx-auto flex justify-center items-center py-20">
      <h2 className="text-xl font-bold text-secondary-900 sm:text-2xl">
        게시글이 존재하지 않습니다.
      </h2>
    </section>
  );
}
