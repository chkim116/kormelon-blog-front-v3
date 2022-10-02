import { SERVER_URL } from 'cypress/support/constants';
import { CategoryCreateParams } from '@core/entities';

describe('category CRUD flow', () => {
  let createParams: CategoryCreateParams;

  before(() => {
    cy.visit('/settings/category');

    cy.fixture('category/createParams.json').then(
      (params) => (createParams = params),
    );
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
  });

  it('create and update category', () => {
    cy.intercept('POST', SERVER_URL + '/category', { statusCode: 201 }).as(
      'createCategory',
    );
    it('update category', () => {
      cy.intercept('PUT', SERVER_URL + '/category', { statusCode: 200 }).as(
        'updateCategory',
      );

      cy.dataCy('create-category-input')
        .type(createParams.value)
        .get('create-category-submit')
        .click();

      cy.wait('@createCategory').then((res) => {
        expect(res.response?.statusCode).to.eq(201);
        cy.dataCy('feedback').should('exist');
      });

      cy.dataCy('edit-category')
        .first()
        .click()
        .dataCy('edit-category-input')
        .type(createParams.value)
        .dataCy('edit-finish')
        .click();

      cy.on('window:confirm', () => true);

      cy.wait('@updateCategory').then((res) => {
        expect(res.response?.statusCode).to.eq(200);
        cy.dataCy('feedback').should('exist');
      });
    });
  });

  it('create and update sub category', () => {
    cy.intercept('POST', SERVER_URL + '/subCategory', { statusCode: 201 }).as(
      'createSubCategory',
    );
    cy.intercept('PUT', SERVER_URL + '/subCategory', { statusCode: 200 }).as(
      'updateSubCategory',
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

    cy.wait('@createSubCategory').then((res) => {
      expect(res.response?.statusCode).to.eq(201);
      cy.dataCy('feedback').should('exist');
    });

    cy.dataCy('edit-category')
      .eq(1)
      .click()
      .dataCy('edit-sub-category-input')
      .type(createParams.value)
      .dataCy('edit-finish')
      .click();

    cy.on('window:confirm', () => true);

    cy.wait('@updateSubCategory').then((res) => {
      expect(res.response?.statusCode).to.eq(200);
      cy.dataCy('feedback').should('exist');
    });
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

    cy.wait('@deleteSubCategory').then((res) => {
      expect(res.response?.statusCode).to.eq(200);
      cy.dataCy('feedback').should('exist');
    });

    cy.dataCy('delete-category').eq(0).click();
    cy.on('window:confirm', () => true);

    cy.wait('@deleteCategory').then((res) => {
      expect(res.response?.statusCode).to.eq(200);
      cy.dataCy('feedback').should('exist');
    });
  });
});
