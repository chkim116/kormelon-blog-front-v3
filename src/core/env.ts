export const env = {
  /**
   * 개발 or 상용 환경 여부 값
   *
   * process.env.NODE_ENV에 의존한다.
   */
  mode: process.env.NODE_ENV,
  /**
   * 상용 모드 체크
   */
  isProduction: process.env.NODE_ENV === 'production',
  /**
   * 개발 모드 체크
   */
  isDevelopment: process.env.NODE_ENV === 'development',
  /**
   * SSR 체크
   */
  isSSR: typeof window === 'undefined',
  /**
   * api url
   */
  apiUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://api.kormelon.com/api'
      : 'http://localhost:4000/api',
  /**
   * FE 도메인
   */
  domain:
    process.env.NODE_ENV === 'production'
      ? 'https://kormelon.com'
      : 'http://localhost:3000',
};
