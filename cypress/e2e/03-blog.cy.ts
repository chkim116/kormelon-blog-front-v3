import { BlogPostCreateParams } from '@core/entities';
import { SERVER_URL } from 'cypress/support/constants';

describe('blog CRUD flow', () => {
  let createParams: BlogPostCreateParams;

  before(() => {
    cy.fixture('blog/createParams.json').then(
      (params) => (createParams = params),
    );

    cy.auth();
    cy.visit('/');
  });

  beforeEach(() => {
    cy.ignoreNotifications();
  });

  it('move to blog write page', () => {
    cy.dataCy('user-menu-button').click().dataCy('blog-write-button').click();
    cy.location('href').should('contain', 'write');
  });

  it('blog write', () => {
    cy.intercept('GET', SERVER_URL + '/post', { statusCode: 200 });
    cy.intercept('POST', SERVER_URL + '/post', { statusCode: 201 });
    cy.intercept('GET', SERVER_URL + '/category', {
      payload: [
        {
          id: 1,
          value: '카테고리',
          subCategories: [{ id: 1, value: '하위', categoryId: 1 }],
        },
      ],
    });

    cy.get('button[type="submit"]')
      .click()
      .feedback('제목 또는 본문을 입력해 주세요');

    cy.get('input[name="title"]')
      .type(createParams.title)
      .get('textarea[name="content"]')
      .type(createParams.content, { force: true });
    cy.get('button[type="submit"]')
      .click()
      .feedback('카테고리를 선택해 주세요');

    cy.dataCy('category-select').click().dataCy('카테고리').click();
    cy.dataCy('sub-category-select').click().dataCy('하위').click();

    cy.get('button[type="submit"]').click();
    cy.location('href')
      .should('contain', 'blog?categoryId=1&subCategoryId=1')
      .feedback('게시글이 작성되었습니다.');
  });
});
