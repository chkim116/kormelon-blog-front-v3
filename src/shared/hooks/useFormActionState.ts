'use client';
import { startTransition, useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { redirect, useRouter } from 'next/navigation';
import {
  ActionFormStateUiState,
  CreateSafeFormAction,
} from '@shared/domains/common/sharedActions.uiState';
import { createActionFormStateUiState } from '@shared/domains/common/sharedActions.create';
import { toast } from '@shared/services/ToastService';

interface FormStateServerActionCallback<D> {
  onSuccess?: (state: ActionFormStateUiState<D>) => void;
  onError?: (state: ActionFormStateUiState<null>) => void;
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

const initialState = createActionFormStateUiState();

/**
 * Form 엘리먼트에 적용할 serverAction advanced hooks
 */
export function useFormActionState<P, D>(
  serverAction: CreateSafeFormAction<P, D>,
  {
    onSuccess = () => {},
    onError = () => {},
    revalidate = false,
    successRedirectPath,
  }: FormStateServerActionCallback<D> = {},
) {
  const refSuccessHandler = useRef(onSuccess);
  const refErrorHandler = useRef(onError);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [state, action] = useFormState(serverAction, initialState) as [
    ActionFormStateUiState<D>,
    (params: P) => Promise<ActionFormStateUiState<D>>,
  ];

  const actionWithStartTransition = async (params: P) => {
    try {
      await action(params);
    } finally {
      //
    }
  };

  const formAction = async (params: P) => {
    setLoading(true);

    startTransition(() => {
      actionWithStartTransition(params).finally(() => setLoading(false));
    });
  };

  useEffect(() => {
    if (state?.isError && typeof refErrorHandler.current === 'function') {
      refErrorHandler.current(state as ActionFormStateUiState<null>);
      toast.open('error', state.message);
    }

    if (state?.isSuccess && typeof refSuccessHandler.current === 'function') {
      if (successRedirectPath) {
        redirect(successRedirectPath);
      }

      if (revalidate) {
        router.refresh();
      }

      refSuccessHandler.current(state);
    }
  }, [revalidate, router, state, successRedirectPath]);

  return { state, formAction, loading };
}
