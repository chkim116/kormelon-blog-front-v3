/// <reference types="cypress" />

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

export {};
