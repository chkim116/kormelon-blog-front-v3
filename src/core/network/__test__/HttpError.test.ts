import { HttpError, HttpErrorType } from '../HttpError';

describe('HttpError', () => {
  it('첫번째 인자는 message로 적용', () => {
    const httpError = new HttpError('Http Error!');

    expect(httpError.message).toBe('Http Error!');
  });

  it.each([
    [400, 'badRequest'],
    [401, 'auth'],
    [403, 'forbidden'],
    [404, 'notFound'],
    [500, 'server'],
    [0, 'unknown'],
  ])(
    '두번째 인자에 statusCode %s를 전달하면 이에 대응하는 HttpErrorType %s 적용',
    (code, type) => {
      const result = new HttpError('error', code);

      expect(result.errorType).toBe(type);
    },
  );

  it.each([null, undefined, {}, [], 'hello', 124])(
    '두번째 인자에 적절하지 않은 값이 전달되면 HttpErrorType unknown 적용',
    (val) => {
      const result = new HttpError('error', val);

      expect(result.errorType).toBe('unknown');
    },
  );

  it.each([
    'auth',
    'unknown',
    'badRequest',
    'forbidden',
    'server',
    'notFound',
  ] as HttpErrorType[])(
    '두번째 인자에 HttpErrorType이 전달되면 그대로 적용',
    (type) => {
      const result = new HttpError('error', type);

      expect(result.errorType).toBe(type);
    },
  );
});
