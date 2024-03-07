import { createApiClient } from '@core/lib/network/createApiClient';
import { env } from '@core/env';
import { prismaResolveHandler } from '@core/lib/network/payloadHandler';
import { CloudinaryFileEntity } from '@core/entities';
import { FileRepository } from './file.repo.type';

const fileNetwork = createApiClient({
  baseURL: env.cloudinaryUploadApiUrl,
});

class FileRepositoryImpl implements FileRepository {
  /**
   * 이미지를 업로드한다.
   *
   * @param fd FormData
   * @returns
   */
  async uploadImage(fd: FormData, tag?: string) {
    fd.append('api_key', env.cloudinaryApiKey);
    fd.append('upload_preset', env.cloudinaryPresetName);

    if (tag) {
      fd.append('tags', tag);
    }

    const { secure_url } = await fileNetwork<CloudinaryFileEntity>('/', {
      method: 'POST',
      body: fd,
    });

    return prismaResolveHandler(secure_url);
  }
}

export const fileRepository = new FileRepositoryImpl();
