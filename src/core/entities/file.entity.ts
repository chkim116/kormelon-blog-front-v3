export interface CloudinaryFileEntity {
  /**
   * 파일의 에셋 ID입니다.
   */
  asset_id: string;
  /**
   * 파일의 공개 ID입니다.
   */
  public_id: string;
  /**
   * 파일의 버전 번호입니다.
   */
  version: number;
  /**
   * 파일의 버전 ID입니다.
   */
  version_id: string;
  /**
   * 파일의 서명입니다.
   */
  signature: string;
  /**
   * 파일의 너비입니다.
   */
  width: number;
  /**
   * 파일의 높이입니다.
   */
  height: number;
  /**
   * 파일의 형식입니다.
   */
  format: string;
  /**
   * 파일의 리소스 유형입니다.
   */
  resource_type: string;
  /**
   * 파일의 생성 날짜입니다.
   */
  created_at: string;
  /**
   * 파일과 관련된 태그입니다.
   */
  tags: string[];
  /**
   * 파일의 크기(바이트)입니다.
   */
  bytes: number;
  /**
   * 파일의 유형입니다.
   */
  type: string;
  /**
   * 파일의 ETag입니다.
   */
  etag: string;
  /**
   * 파일이 플레이스홀더인지 여부를 나타냅니다.
   */
  placeholder: boolean;
  /**
   * 파일의 URL입니다.
   */
  url: string;
  /**
   * 파일의 보안 URL입니다.
   */
  secure_url: string;
}
