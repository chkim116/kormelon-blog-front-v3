import { mount } from 'cypress/react';

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      // cypress에서 사용할 커맨드 추가
      // 추가한 타입은 cypress/support/commands.ts에서 구현.
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;
      login(email: string, password: string): Chainable<JQuery<HTMLElement>>;
      register(
        email: string,
        password: string,
        username: string,
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}
