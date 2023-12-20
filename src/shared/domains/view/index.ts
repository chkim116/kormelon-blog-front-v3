import { viewRepository } from '@shared/repositories/view.repo';
import { ViewServiceImpl } from './view.service';

export const viewService = new ViewServiceImpl(viewRepository);
