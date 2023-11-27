import { SERVER_URL } from 'cypress/support/constants';
import { faker } from '@faker-js/faker';

const API_REGISTER = SERVER_URL + '/auth/signup';
const API_SIGN_IN = SERVER_URL + '/auth/signin';

describe('유저 회원가입과 로그인', () => {
  beforeEach(() => {
    cy.ignoreNotifications();
  });

  it('로그인 폼 > 회원가입 폼 전환.', () => {
    cy.visit('/auth');

    cy.dataCy('toRegister').click();

    cy.dataCy('toLogin').should('exist');
  });

  it('회원가입 폼 > 입력 값이 없을 시 진행되지 않음.', () => {
    cy.visit('/auth');
    cy.dataCy('toRegister').click();

    cy.dataCy('registerButton').click();

    cy.contains(/값을 입력/).should('exist');
  });

  it('회원가입 폼 > 유효성 검증 실패 시 toast 나타남.', () => {
    const FAILURE_MESSAGE = '이미 가입한 유저입니다.';
    cy.intercept('POST', API_REGISTER, {
      statusCode: 400,
      body: {
        message: FAILURE_MESSAGE,
      },
    }).as('apiRegister');

    cy.visit('/auth');
    cy.dataCy('toRegister').click();

    cy.register('email@email.com', 'password', 'username');
    cy.wait('@apiRegister');
    cy.toast(FAILURE_MESSAGE);
  });

  it('회원가입 폼 > 회원가입 진행 완료 시 로그인 폼으로 전환', () => {
    cy.intercept('POST', API_REGISTER, {
      statusCode: 201,
    }).as('apiRegister');

    cy.visit('/auth');
    cy.dataCy('toRegister').click();

    cy.register('email@email.com', 'password', 'username');
    cy.wait('@apiRegister');
    // 로그인 폼 전환
    cy.dataCy('toRegister').should('exist');
  });

  it('로그인 폼 > 입력 값이 없을 시 진행되지 않음.', () => {
    cy.visit('/auth');

    cy.dataCy('signInButton').click();

    cy.contains(/값을 입력/).should('exist');
  });

  it('로그인 폼 > 유효성 검증 실패 시 toast 나타남.', () => {
    const FAILURE_MESSAGE = '비밀번호가 틀립니다.';
    cy.intercept('POST', API_SIGN_IN, {
      statusCode: 400,
      body: {
        message: FAILURE_MESSAGE,
      },
    }).as('apiSignIn');

    cy.visit('/auth');

    cy.dataCy('signInButton').click();

    cy.login('email@email.com', 'password');
    cy.wait('@apiSignIn');
    cy.toast(FAILURE_MESSAGE);
  });

  it('로그인 폼 > 로그인 성공 시 /blog 페이지로 이동.', () => {
    cy.intercept('POST', API_SIGN_IN, {
      statusCode: 200,
      body: {
        payload: {
          token: 'token',
          user: {
            id: faker.number.int(100),
            profileImage: faker.image.avatar(),
            role: 'member',
            username: faker.person.fullName(),
          },
        },
      },
    }).as('apiSignIn');

    cy.visit('/auth');

    cy.dataCy('signInButton').click();

    cy.login('email@email.com', 'password');
    cy.wait('@apiSignIn');
    cy.location('href').should('contain', 'blog');
  });
});
