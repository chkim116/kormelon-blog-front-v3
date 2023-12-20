'use client';
import { startTransition, useEffect, useRef, useState } from 'react';
import {
  ActionFormStateUiState,
  ActionFnType,
} from '@shared/domains/common/sharedActions.uiState';
import { createActionFormStateUiState } from '@shared/domains/common/sharedActions.create';

interface UseActionStateCallback<Data> {
  onSuccess?: (state: ActionFormStateUiState<Data>) => void;
  onError?: (state: ActionFormStateUiState) => void;
}

/**
 * 일반적인 serverAction에 대한 advanced hooks
 *
 * @param initialState - 초기값
 * @param serverAction - nextjs13 - serverAction
 */
export function useActionState<Data, Params>(
  initialState: Data,
  serverAction: ActionFnType<Params, Data>,
  {
    onSuccess = () => {},
    onError = () => {},
  }: UseActionStateCallback<Data> = {},
) {
  const refSuccessHandler = useRef(onSuccess);
  const refErrorHandler = useRef(onError);

  const [loading, setLoading] = useState(false);

  const [state, setState] = useState<ActionFormStateUiState<Data>>({
    ...createActionFormStateUiState(),
    data: initialState,
  });

  const actionWithStartTransition = async (params: Params): Promise<Data> => {
    setLoading(true);

    if (loading) {
      return state.data;
    }

    let form: ActionFormStateUiState<Data> = state;

    try {
      form = await serverAction(params);
      setState(form);
    } finally {
      setLoading(false);
    }

    return form?.data;
  };

  const action = async (params: Params): Promise<Data> =>
    await new Promise((resolve, reject) => {
      startTransition(() => {
        console.log('startTransition useActionState on..');
        actionWithStartTransition(params)
          .then((form) => resolve(form))
          .catch(reject);
      });
    });

  useEffect(() => {
    if (state?.isError && typeof refErrorHandler.current == 'function') {
      refErrorHandler.current(state as ActionFormStateUiState<null>);
    }

    if (state?.isSuccess && typeof refSuccessHandler.current == 'function') {
      console.log('call');
      refSuccessHandler.current(state);
    }
  }, [state]);

  return { state, loading, action };
}
