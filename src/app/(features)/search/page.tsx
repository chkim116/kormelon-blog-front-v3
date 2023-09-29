'use client';
import { useCallback, useEffect } from 'react';
import { useQueryParser } from '@shared/hooks';
import { useAppDispatch } from '@shared/stores';
import { toast } from '@shared/services';
import { refineBlogPostSearchParamsModel } from '@domain/manipulates';
import { SearchListContainer } from './containers';
import { effSearchPostsByKeywords } from './stores';

export default function SearchPage() {
  const params = useQueryParser(refineBlogPostSearchParamsModel);
  const dispatch = useAppDispatch();

  const loadSearchList = useCallback(() => {
    dispatch(effSearchPostsByKeywords(params))
      .unwrap()
      .catch((err) => toast.open(err.message));
  }, [dispatch, params]);

  useEffect(loadSearchList, [loadSearchList]);

  return <SearchListContainer params={params} />;
}
