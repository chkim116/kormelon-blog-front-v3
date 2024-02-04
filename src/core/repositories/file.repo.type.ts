import { PromisePrismaResolveResponse } from '@core/entities';

export interface FileRepository {
  /**
   * 이미지를 업로드한다.
   *
   * @param fd FormData
   * @param tags 이미지의 태그 이름
   * @returns
   */
  uploadImage(
    fd: FormData,
    tags?: string,
  ): PromisePrismaResolveResponse<string>;
}
