import { AuthLoginParams, AuthRegisterParams } from '@core/entities';
import { SERVER_URL } from 'cypress/support/constants';

describe('auth flow', () => {
  let registerParams: AuthRegisterParams;
  let loginParams: AuthLoginParams;

  before(() => {
    cy.fixture('auth/register.json').then((params) => {
      registerParams = params;
    });
    cy.fixture('auth/login.json').then((params) => {
      loginParams = params;
    });
  });

  beforeEach(() => {
    cy.ignoreNotifications();
  });

  it('register and login', () => {
    cy.intercept('POST', SERVER_URL + '/auth/signup', {
      statusCode: 201,
    }).as('register');
    cy.intercept('POST', SERVER_URL + '/auth/signin').as('loginUser');

    cy.visit('/');

    cy.dataCy('user-menu-button')
      .click()
      .dataCy('login-button')
      .click()
      .location('href')
      .should('contain', 'auth')
      .dataCy('to-register')
      .click();

    cy.register(
      registerParams.email,
      registerParams.password,
      registerParams.username,
    );

    cy.wait('@register');

    cy.login(loginParams.email, loginParams.password);

    cy.wait('@loginUser').then(() => {
      expect(cy.location('href').should('contain', 'blog'));
    });
  });

  it('logout and show "success feedback"', () => {
    cy.dataCy('user-menu-button').click().dataCy('logout-button').click();

    cy.dataCy('feedback').should('exist');
  });
});
