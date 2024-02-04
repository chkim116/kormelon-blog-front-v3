import { toString } from 'safers';

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
  nextAuthSecret: process.env.NEXTAUTH_SECRET,
  /**
   * AWS secretAccessKey
   */
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  /**
   * AWS accessKeyId
   */
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,

  /**
   * 클라우드디너리 이름
   */
  cloudinaryName: toString(process.env.CLOUDINARY_NAME),
  /**
   * 클라우드디너리 Preset 이름
   */
  cloudinaryPresetName: toString(process.env.CLOUDINARY_PRESET),
  /**
   * 클라우드디너리 API key
   */
  cloudinaryApiKey: toString(process.env.CLOUDINARY_API_KEY),
  /**
   * 클라우드디너리 API Secret
   */
  cloudinaryApiSecret: toString(process.env.CLOUDINARY_API_SECRET),
  /**
   * 클라우드디너리 URL
   */
  cloudinaryUrl: toString(process.env.CLOUDINARY_URL),
  /**
   * 클라우드디너리 업로드 Url
   */
  cloudinaryUploadApiUrl: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,
};
