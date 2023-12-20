/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ActionFormStateUiState<Data = any> {
  /**
   * 성공 여부
   */
  isSuccess: boolean;
  /**
   * 실패 여부
   */
  isError: boolean;
  /**
   * 성공 or 실패에 대한 지정된 메시지
   */
  message: string;
  /**
   * 수행 후 담기는 데이터
   */
  data: Data;
}

export interface ActionFnCallback {
  redirectPath: (path: string) => void;
}

/**
 * Form에 이용할 server action function 타입
 */
export type ActionFormFnType<P = unknown, D = unknown> = (
  _: any,
  formData: P,
) => Promise<ActionFormStateUiState<D>>;

/**
 * 일반적인 server action function 타입
 */
export type ActionFnType<P, D> = (
  data: P,
) => Promise<ActionFormStateUiState<D>>;
