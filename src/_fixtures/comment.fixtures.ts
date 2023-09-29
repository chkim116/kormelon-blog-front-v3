import { faker } from '@faker-js/faker';
import { toBlogPostCommentSearchModels } from '@domain/manipulates';
import { CommentSearchEntity } from '@server/entities';
import { BlogPostCommentSearchModel } from '@domain/uiStates';

function getCommentList(length = 6, isAnonymous = false) {
  const results: CommentSearchEntity[] = Array.from({ length }, () => {
    const result: CommentSearchEntity = {
      commentReplies: [],
      id: faker.string.uuid(),
      value: faker.lorem.paragraphs(),
      isAnonymous,

      userId:
        !isAnonymous && faker.datatype.boolean() ? faker.string.uuid() : null,
      username: faker.person.fullName(),
      user: {
        profileImage: faker.image.dataUri(),
      },
      createdAt: faker.date.anytime().toString(),
      deletedAt: null,
    };

    return result;
  });

  return toBlogPostCommentSearchModels(results);
}

function getCommentListWithReplies(length = 6, replyLength = 3) {
  const results: BlogPostCommentSearchModel[] = getCommentList(length).map(
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
