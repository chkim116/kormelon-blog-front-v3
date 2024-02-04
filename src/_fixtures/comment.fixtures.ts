import { faker } from '@faker-js/faker';
import { CommentSearchEntity } from '@core/entities';
import { CommentSearchUiState } from '@features/blog/domains/comment/comment.uiState';
import { toCommentSearchUiStates } from '@features/blog/domains/comment/comment.convert';

function getCommentList(length = 6, isAnonymous = false) {
  const results: CommentSearchEntity[] = Array.from({ length }, () => {
    const result: CommentSearchEntity = {
      commentReply: [],
      id: faker.string.uuid(),
      value: faker.lorem.paragraphs(),
      isAnonymous,
      userId:
        !isAnonymous && faker.datatype.boolean() ? faker.string.uuid() : null,
      user: {
        username: faker.person.fullName(),
        profileImage: faker.image.dataUri(),
      },
      createdAt: faker.date.past(),
      deletedAt: null,
      username: '',
    };

    return result;
  });

  return toCommentSearchUiStates(results);
}

function getCommentListWithReplies(length = 6, replyLength = 3) {
  const results: CommentSearchUiState[] = getCommentList(length).map(
    (item) => ({
      ...item,
      commentReplies: getCommentList(replyLength),
    }),
  );

  return results;
}

export const commentFixtures = {
  getCommentList,
  getCommentListWithReplies,
};
