/* eslint-disable @typescript-eslint/no-explicit-any */

export function createMockFunctionWithResolvedValue(value?: any, meta?: any) {
  return jest.fn().mockResolvedValue({ payload: value, meta });
}

export function createMockFunctionWithRejectedValue(value: any) {
  return jest.fn().mockRejectedValue(value);
}
