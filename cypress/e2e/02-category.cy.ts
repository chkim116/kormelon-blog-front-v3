import { SERVER_URL } from 'cypress/support/constants';
import { CategoryCreateParams } from '@core/entities';

describe('category CRUD flow', () => {
  let createParams: CategoryCreateParams;

  before(() => {
    cy.fixture('category/createParams.json').then(
      (params) => (createParams = params),
    );
    cy.auth();
    cy.visit('/');
  });

  beforeEach(() => {
    cy.intercept('GET', SERVER_URL + '/category', {
      payload: [
        {
          id: 1,
          value: '카테고리',
          subCategories: [{ id: 1, value: '하위', categoryId: 1 }],
        },
      ],
    });
    cy.ignoreNotifications();
  });

  it('move to category setting', () => {
    cy.dataCy('user-menu-button').click().dataCy('setting-button').click();
    cy.location('href').should('contain', 'settings/category');
  });

  it('create category', () => {
    cy.intercept('POST', SERVER_URL + '/category', { statusCode: 200 }).as(
      'createCategory',
    );

    cy.dataCy('create-category-input')
      .type(createParams.value)
      .dataCy('create-category-submit')
      .click();

    cy.wait('@createCategory');
    cy.feedback(`${createParams.value} 카테고리 생성`);
  });

  it('update category', () => {
    cy.intercept('PUT', SERVER_URL + '/category', { statusCode: 200 }).as(
      'updateCategory',
    );

    cy.dataCy('edit-category')
      .first()
      .click()
      .dataCy('edit-category-input')
      .type(createParams.value)
      .dataCy('edit-finish')
      .click();

    cy.on('window:confirm', () => true);

    cy.wait('@updateCategory');
    cy.feedback('수정 완료');
  });

  it('create sub category', () => {
    cy.intercept('POST', SERVER_URL + '/subCategory', { statusCode: 201 }).as(
      'createSubCategory',
    );

    cy.dataCy('create-category-modal-open')
      .first()
      .click()
      .dataCy('create-dialog')
      .should('exist')
      .dataCy('create-subcategory-input')
      .type(createParams.value)
      .dataCy('create-subcategory-submit')
      .click();

    cy.on('window:confirm', () => true);

    cy.wait('@createSubCategory');
    cy.feedback(`서브 카테고리 ${createParams.value} 생성 완료`);
  });

  it('update sub category', () => {
    cy.intercept('PUT', SERVER_URL + '/subCategory', { statusCode: 200 }).as(
      'updateSubCategory',
    );

    cy.dataCy('edit-category')
      .eq(1)
      .click()
      .dataCy('edit-sub-category-input')
      .type(createParams.value)
      .dataCy('edit-finish')
      .click();

    cy.on('window:confirm', () => true);

    cy.wait('@updateSubCategory');
    cy.feedback('수정 완료');
  });

  it('delete category and sub category', () => {
    cy.intercept('DELETE', SERVER_URL + '/category?id=1', {
      statusCode: 200,
    }).as('deleteCategory');
    cy.intercept('DELETE', SERVER_URL + '/subCategory?id=1', {
      statusCode: 200,
    }).as('deleteSubCategory');

    cy.dataCy('delete-category').eq(1).click();
    cy.on('window:confirm', () => true);

    cy.wait('@deleteSubCategory');
    cy.feedback('삭제 완료');

    cy.dataCy('delete-category').eq(0).click();
    cy.on('window:confirm', () => true);

    cy.wait('@deleteCategory');
    cy.feedback('삭제 완료');
  });
});
