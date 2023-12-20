import { authRepository } from '../repositories/auth.repo';
import { AuthServiceImpl } from './auth.service';

export const authService = new AuthServiceImpl(authRepository);
