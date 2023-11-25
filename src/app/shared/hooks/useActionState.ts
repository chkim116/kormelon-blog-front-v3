'use client';
import { useEffect, useRef, useState } from 'react';
import {
  ActionFormStateUiState,
  ActionFnType,
} from 'src/app/shared/uiStates/sharedActions.uiState';
import { createActionFormStateUiState } from 'src/app/shared/manipulates/sharedActions.create';

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

  const action = async (params: Params): Promise<Data> => {
    setLoading(true);

    if (loading) {
      return state.data;
    }

    const form = await serverAction(params);

    setState(form);
    setLoading(false);

    return form.data;
  };

  useEffect(() => {
    if (state?.isError && typeof refErrorHandler.current == 'function') {
      refErrorHandler.current(state as ActionFormStateUiState<null>);
    }

    if (state?.isSuccess && typeof refSuccessHandler.current == 'function') {
      refSuccessHandler.current(state);
    }
  }, [state]);

  return { state, loading, action };
}
