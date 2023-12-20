'use client';
import { startTransition, useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { redirect } from 'next/navigation';
import {
  ActionFormStateUiState,
  ActionFormFnType,
  ActionFnCallback,
} from '@shared/domains/common/sharedActions.uiState';
import { createActionFormStateUiState } from '@shared/domains/common/sharedActions.create';

interface FormStateServerActionCallback<D> {
  onSuccess?: (
    state: ActionFormStateUiState<D>,
    callback: ActionFnCallback,
  ) => void;
  onError?: (state: ActionFormStateUiState<null>) => void;
}

const initialState = createActionFormStateUiState();

/**
 * Form 엘리먼트에 적용할 serverAction advanced hooks
 */
export function useFormActionState<P, D>(
  serverAction: ActionFormFnType<P, D>,
  {
    onSuccess = () => {},
    onError = () => {},
  }: FormStateServerActionCallback<D> = {},
) {
  const refSuccessHandler = useRef(onSuccess);
  const refErrorHandler = useRef(onError);

  const [loading, setLoading] = useState(false);
  const [state, action] = useFormState(serverAction, initialState) as [
    ActionFormStateUiState<D>,
    (params: P) => Promise<ActionFormStateUiState<D>>,
  ];

  const actionWithStartTransition = async (params: P) => {
    setLoading(true);

    try {
      await action(params);
    } finally {
      setLoading(false);
    }
  };

  const formAction = async (params: P) => {
    startTransition(() => {
      console.log('startTransition useFormActionState on..');
      actionWithStartTransition(params);
    });
  };

  useEffect(() => {
    if (state?.isError && typeof refErrorHandler.current === 'function') {
      refErrorHandler.current(state as ActionFormStateUiState<null>);
    }

    if (state?.isSuccess && typeof refSuccessHandler.current === 'function') {
      console.log('call on..');
      refSuccessHandler.current(state, {
        redirectPath(path) {
          redirect(path);
        },
      });
    }
  }, [state]);

  return { state, formAction, loading };
}
