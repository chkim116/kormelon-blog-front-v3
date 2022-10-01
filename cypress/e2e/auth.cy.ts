import { STORAGE_TOKEN_KEY, STORAGE_USER_KEY } from '@common/constants';
import {
  AuthLoginParams,
  AuthRegisterParams,
  UserEntity,
} from '@core/entities/auth.entity';
import { SERVER_URL } from 'cypress/support/constants';

describe('auth flow', () => {
  let registerParams: AuthRegisterParams;
  let loginParams: AuthLoginParams;
  let user: UserEntity;

  before(() => {
    cy.visit('/');

    cy.fixture('auth/register.json').then((params) => {
      registerParams = params;
    });
    cy.fixture('auth/login.json').then((params) => {
      loginParams = params;
    });
    cy.fixture('auth/user.json').then((userData) => {
      user = userData;
    });
  });

  it('register and login. set localStorage with after user login', () => {
    cy.intercept('POST', SERVER_URL + '/auth/signup', {
      statusCode: 201,
    }).as('createUser');
    cy.intercept('POST', SERVER_URL + '/auth/signin', {
      body: {
        payload: { user, token: 'token!' },
      },
    }).as('loginUser');

    cy.dataCy('user-menu-button')
      .click()
      .dataCy('login-button')
      .click()
      .location('href')
      .should('contain', 'auth')
      .dataCy('to-register')
      .click();

    cy.get('input[name="email"]')
      .type(registerParams.email)
      .get('input[name="password"]')
      .type(registerParams.password)
      .get('input[name="username"]')
      .type(registerParams.username)
      .get('button[type="submit"]')
      .click();

    cy.wait('@createUser').then((res) =>
      expect(res.response?.statusCode).to.eq(201),
    );

    cy.get('input[name="email"]')
      .type(loginParams.email)
      .get('input[name="password"]')
      .type(loginParams.password)
      .get('button[type="submit"]')
      .click();

    cy.wait('@loginUser').then((res) => {
      expect(res.response?.body.payload.user).to.deep.equal(user);
      expect(localStorage.getItem(STORAGE_TOKEN_KEY)).to.not.null;
      expect(localStorage.getItem(STORAGE_USER_KEY)).to.not.null;
      expect(cy.location('href').should('contain', '/'));
    });
  });

  it('logout and clear localStorage. show "success feedback" with user logout', () => {
    cy.dataCy('user-menu-button')
      .click()
      .dataCy('logout-button')
      .click()
      .dataCy('feedback')
      .should('exist');

    expect(localStorage.getItem(STORAGE_TOKEN_KEY)).to.null;
    expect(localStorage.getItem(STORAGE_USER_KEY)).to.null;
  });
});
