/// <reference types="cypress" />

Cypress.Commands.add('dataCy', (value) => cy.get(`[data-cy=${value}]`));
