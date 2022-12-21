import React, { useCallback, useEffect } from 'react';
import { useAppDispatch } from '@common/store';
import { effTagAllSearchLoad } from '@shared/stores/tag';
import { TagSearchListContainer } from '../containers';

export const TagPage = () => {
  const dispatch = useAppDispatch();

  const loadAllTags = useCallback(() => {
    dispatch(effTagAllSearchLoad());
  }, [dispatch]);

  useEffect(loadAllTags, [loadAllTags]);

  return <TagSearchListContainer />;
};
