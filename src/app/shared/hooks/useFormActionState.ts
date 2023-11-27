'use client';
import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { redirect } from 'next/navigation';
import {
  ActionFormStateUiState,
  ActionFormFnType,
  ActionFnCallback,
} from 'src/app/shared/uiStates/sharedActions.uiState';
import { createActionFormStateUiState } from 'src/app/shared/manipulates/sharedActions.create';

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

  const formAction = async (params: P) => {
    setLoading(true);

    await action(params);

    setLoading(false);
  };

  useEffect(() => {
    if (state?.isError && typeof refErrorHandler.current === 'function') {
      refErrorHandler.current(state as ActionFormStateUiState<null>);
    }

    if (state?.isSuccess && typeof refSuccessHandler.current === 'function') {
      refSuccessHandler.current(state, {
        redirectPath(path) {
          redirect(path);
        },
      });
    }
  }, [state]);

  return { state, formAction, loading };
}
