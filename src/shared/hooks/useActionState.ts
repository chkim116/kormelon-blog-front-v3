'use client';
import { startTransition, useEffect, useRef, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { toast } from '@shared/services/ToastService';
import {
  ActionStateUiState,
  CreateSafeAction,
} from '@shared/domains/common/sharedActions.uiState';
import { createActionStateUiState } from '@shared/domains/common/sharedActions.create';

interface UseActionStateCallback<Data> {
  onSuccess?: (state: ActionStateUiState<Data>) => void;
  onError?: (state: ActionStateUiState) => void;
  /**
   * 셩공시 페이지 이동
   */
  successRedirectPath?: string;
  /**
   * 현재 페이지 RSC 새로고침 여부
   *
   * 내부적으로 router.refresh()를 호출한다.
   */
  revalidate?: boolean;
}

/**
 * 일반적인 serverAction에 대한 advanced hooks
 *
 * @param initialState - 초기값
 * @param serverAction - nextjs13 - serverAction
 */
export function useActionState<Data, Params>(
  initialState: Data,
  serverAction: CreateSafeAction<Params, Data>,
  {
    onSuccess = () => {},
    onError = () => {},
    successRedirectPath,
    revalidate = false,
  }: UseActionStateCallback<Data> = {},
) {
  const router = useRouter();

  const refSuccessHandler = useRef(onSuccess);
  const refErrorHandler = useRef(onError);

  const [loading, setLoading] = useState(false);

  const [state, setState] = useState<ActionStateUiState<Data>>({
    ...createActionStateUiState(),
    data: initialState,
  });

  const actionWithStartTransition = async (params: Params): Promise<Data> => {
    let form: ActionStateUiState<Data> = state;

    try {
      form = await serverAction(params);
      setState(form);
    } finally {
      //
    }

    return form?.data;
  };

  const action = async (params: Params): Promise<Data> => {
    setLoading(true);

    return await new Promise((resolve, reject) => {
      startTransition(() => {
        actionWithStartTransition(params)
          .then((form) => resolve(form))
          .catch(reject)
          .finally(() => setLoading(false));
      });
    });
  };

  useEffect(() => {
    if (state?.isError && typeof refErrorHandler.current == 'function') {
      refErrorHandler.current(state as ActionStateUiState<null>);
      toast.open('error', state.message);
    }

    if (state?.isSuccess && typeof refSuccessHandler.current == 'function') {
      if (successRedirectPath) {
        redirect(successRedirectPath);
      }

      if (revalidate) {
        router.refresh();
      }

      refSuccessHandler.current(state);
    }
  }, [revalidate, router, state, successRedirectPath]);

  return { state, loading, action };
}
