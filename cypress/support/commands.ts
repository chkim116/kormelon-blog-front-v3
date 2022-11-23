/// <reference types="cypress" />
import { tokenProvider } from '../../src/core/tokenProvider';
import { SERVER_URL } from './constants';
import user from '../fixtures/auth/user.json';

Cypress.Commands.add('dataCy', (value) => cy.get(`[data-cy=${value}]`));

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.get('input[name="email"]')
    .type(email)
    .get('input[name="password"]')
    .type(password)
    .get('button[type="submit"]')
    .click();
});

Cypress.Commands.add(
  'register',
  (email: string, password: string, username: string) => {
    cy.get('input[name="email"]')
      .type(email)
      .get('input[name="password"]')
      .type(password)
      .get('input[name="username"]')
      .type(username)
      .get('button[type="submit"]')
      .click();
  },
);

Cypress.Commands.add('auth', () => {
  tokenProvider().set('kormelon_user', user);
  tokenProvider().set('kormelon_token', 'token');
});

Cypress.Commands.add('ignoreNotifications', () => {
  cy.intercept('GET', SERVER_URL + '/notification', {
    statusCode: 200,
    payload: [],
  });
});

Cypress.Commands.add('feedback', (value?: string) => {
  if (value) {
    cy.dataCy('feedback').should('contain', value);
    return;
  }

  cy.dataCy('feedback').should('exist');
});

export {};
