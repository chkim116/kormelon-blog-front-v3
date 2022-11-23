import { mount } from 'cypress/react';

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      // cypress에서 사용할 커맨드 추가
      // 추가한 타입은 cypress/support/commands.ts에서 구현.
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;
      /**
       * 로그인
       */
      login(email: string, password: string): Chainable<JQuery<HTMLElement>>;
      /**
       * 회원가입
       */
      register(
        email: string,
        password: string,
        username: string,
      ): Chainable<JQuery<HTMLElement>>;
      /**
       * 유저가 로그인 된 상태로 만든다.
       */
      auth(): void;
      /**
       * 알림 가져오는 API를 무시한다.
       */
      ignoreNotifications(): void;
      /**
       * 피드백을 확인한다.
       */
      feedback(text?: string): void;
    }
  }
}
