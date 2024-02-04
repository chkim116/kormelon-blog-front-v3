import { fileRepository } from '@core/repositories/file.repo';
import { NextAuthClientHelperServiceImpl } from '@shared/services/NextAuthClientHelperService';
import { AuthServiceImpl } from './auth.service';

export const authService = new AuthServiceImpl(
  fileRepository,
  new NextAuthClientHelperServiceImpl(),
);
