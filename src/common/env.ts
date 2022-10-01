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
};
