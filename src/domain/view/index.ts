import { viewRepository } from '@server/repositories/view.repo';
import { ViewServiceImpl } from './view.service';

export const viewService = new ViewServiceImpl(viewRepository);
