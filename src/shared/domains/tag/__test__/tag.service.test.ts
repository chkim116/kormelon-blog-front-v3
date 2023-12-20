import { createMockFunctionWithResolvedValue } from '@fixtures/tests';
import { TagSearchEntity, TagSearchWithPostEntity } from '@shared/entities';
import { TagRepository } from '@shared/repositories/tag.repo.type';
import {
  toTagSearchUiStates,
  toTagSearchWithPostCountUiStates,
} from '../tag.convert';
import { TagServiceImpl } from '../tag.service';

const tagRepository: TagRepository = {
  fetchTagByValue: jest.fn(),
  createTag: jest.fn(),
  fetchAllTags: jest.fn(),
  fetchPostsByTagId: jest.fn(),
};

const tagService = new TagServiceImpl(tagRepository);

describe('TagService 성공 케이스', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('값으로 태그 조회', async () => {
    tagRepository.fetchTagByValue = createMockFunctionWithResolvedValue([]);
    const value = 'tag';

    const emptyResults = await tagService.fetchTagsByValue(value);
    expect(tagRepository.fetchTagByValue).toHaveBeenCalledWith(value);
    expect(emptyResults).toEqual(toTagSearchUiStates([]));

    const responseTagsByValue: TagSearchEntity[] = [{ id: 1, value: 'tag' }];

    tagRepository.fetchTagByValue =
      createMockFunctionWithResolvedValue(responseTagsByValue);
    const result = await tagService.fetchTagsByValue(value);
    expect(tagRepository.fetchTagByValue).toHaveBeenCalledWith(value);
    expect(result).toEqual(toTagSearchUiStates(responseTagsByValue));
  });

  it('모든 태그 조회', async () => {
    const responseAllTags: TagSearchWithPostEntity[] = [
      { id: 1, value: 'tag', posts: [{ id: 13 }] },
    ];

    tagRepository.fetchAllTags = createMockFunctionWithResolvedValue(
      responseAllTags,
      { total: 1 },
    );

    const results = await tagService.fetchAllTags();

    expect(tagRepository.fetchAllTags).toHaveBeenCalled();
    expect(results.tags).toEqual(
      toTagSearchWithPostCountUiStates(responseAllTags),
    );
    expect(results.total).toEqual(1);
  });

  it('태그 생성', async () => {
    tagRepository.createTag = createMockFunctionWithResolvedValue({
      id: 1,
      value: 'tag',
      posts: [{ id: 13 }],
    });

    const value = 'tag';
    const result = await tagService.createTag(value);

    expect(tagRepository.createTag).toHaveBeenCalledWith(value);
    expect(result.value).toEqual(value);
  });
});
