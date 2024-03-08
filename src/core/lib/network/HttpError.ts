export type HttpErrorType =
  | 'unknown'
  | 'auth'
  | 'badRequest'
  | 'server'
  | 'notFound'
  | 'forbidden';

export interface HttpErrorModel extends Error {
  errorType: HttpErrorType;
}

const DEFAULT_HTTP_ERROR_MESSAGE = '알 수 없는 서버 오류입니다.';

export class HttpError implements HttpErrorModel {
  message: string;
  stack: string;
  errorType: HttpErrorType = 'unknown';
  name = 'httpError';

  constructor();
  constructor(message: string);
  constructor(message: string, statusCode: number);
  constructor(message: string, errorType: HttpErrorType);
  constructor(message: string, unknown: unknown);

  constructor(
    message: string = DEFAULT_HTTP_ERROR_MESSAGE,
    arg?: HttpErrorType | number | unknown,
  ) {
    this.message = message;
    this.stack = new Error(message).stack || '';
    this.parseErrorType(arg);
  }

  parseErrorType(arg: HttpErrorType | number | unknown) {
    if (typeof arg === 'number') {
      this.errorType = this.findErrorTypeByCode(arg);
      return;
    }

    if (typeof arg === 'string' && this.isHttpErrorType(arg)) {
      this.errorType = arg;
      return;
    }

    this.errorType = 'unknown';
  }

  private isHttpErrorType(val: unknown): val is HttpErrorType {
    const expected: Set<HttpErrorType> = new Set([
      'auth',
      'badRequest',
      'forbidden',
      'notFound',
      'server',
      'unknown',
    ]);

    return expected.has(val as never);
  }

  private findErrorTypeByCode(code: number): HttpErrorType {
    if (code === 400) {
      return 'badRequest';
    }

    if (code === 401) {
      return 'auth';
    }

    if (code === 403) {
      return 'forbidden';
    }

    if (code === 404) {
      return 'notFound';
    }

    if (code >= 500) {
      return 'server';
    }

    return 'unknown';
  }
}
