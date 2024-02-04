import { HttpError } from '@core/network/HttpError';
import {
  createMockFunctionWithRejectedValue,
  createMockFunctionWithResolvedValue,
} from '@fixtures/tests';
import { ViewEntity } from '@core/entities';
import { ViewRepository } from '@core/repositories/view.repo.type';
import { toViewUiState } from '../view.convert';
import { ViewServiceImpl } from '../view.service';

const viewRepository: ViewRepository = {
  fetchView: jest.fn(),
  addView: jest.fn(),
};

const viewService = new ViewServiceImpl(viewRepository);

describe('viewService 성공 케이스', () => {
  it('조회수 호출', async () => {
    const response: ViewEntity = {
      today: 1,
      total: 100,
    };
    viewRepository.fetchView = createMockFunctionWithResolvedValue(response);

    const result = await viewService.fetchView();

    expect(result).toEqual(toViewUiState(response));
    expect(viewRepository.fetchView).toHaveBeenCalled();
  });
});

describe('viewService 실패 케이스', () => {
  it('조회수 호출 실패', async () => {
    viewRepository.fetchView = createMockFunctionWithRejectedValue(
      new HttpError('에러'),
    );

    await expect(() => viewService.fetchView()).rejects.toMatchObject({
      message: '에러',
    });
    expect(viewRepository.fetchView).toHaveBeenCalled();
  });
});
