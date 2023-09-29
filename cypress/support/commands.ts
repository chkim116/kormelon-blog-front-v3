/// <reference types="cypress" />
import { SERVER_URL } from './constants';

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

Cypress.Commands.add('ignoreNotifications', () => {
  cy.intercept('GET', SERVER_URL + '/notification', {
    statusCode: 200,
    body: { payload: [] },
  });
});

Cypress.Commands.add('toast', (value?: string) => {
  if (value) {
    cy.get('#toast').should('contain', value);
    return;
  }

  cy.get('#toast').should('exist');
});
