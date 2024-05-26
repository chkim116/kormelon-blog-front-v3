'use client';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NowSectionProps {}

export default function NowSection(_: NowSectionProps) {
  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="text-center mb-8 space-y-2">
        <h1 className="text-3xl font-bold mt-3 text-primary-900 sm:text-4xl lg:text-5xl">
          Now 😎
        </h1>
      </div>

      <div className="max-w-3xl py-8 space-y-2 mx-auto">
        <h2 className="text-2xl font-bold">Work</h2>
        <p>최근 레벨13(룩핀)에서 비바리퍼블리카(토스)로 이직했어요.</p>
        <p>
          현재 비바리퍼블리카의 틴즈 서비스 Frontend를 담당하고 있고 새로운
          환경에 적응하기 위해 노력하고 있어요.
        </p>
      </div>

      <div className="max-w-3xl py-8 space-y-2 mx-auto">
        <h2 className="text-2xl font-bold">Focus on</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            개발 생산성 향상과 유지보수 좋은 소프트웨어 구축에 관심을 갖고
            있어요.
          </li>
          <li>
            Frontend 영역 외에도 기술 이해도를 기르고자 네이티브앱과 서버 영역에
            대해 공부하려 해요.
          </li>
          <li>한달에 1개의 게시글을 올려 블로그 활성화를 고민 중이에요.</li>
          <li>
            잠시 쉬었던 운동을 재개했고 앞으로 꾸준히 하려고 생각하고 있어요.
          </li>
          <li>언제나 그렇듯 한달에 1-2권씩 책을 꾸준히 읽고 있어요.</li>
        </ul>
      </div>

      <p className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
        최종 업데이트: 24년 5월 25일
      </p>
    </section>
  );
}
