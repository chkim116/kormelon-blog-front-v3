'use client';
import React, { useCallback, useEffect } from 'react';
import { useAppDispatch } from '@shared/stores';
import { effTagAllSearchLoad } from '@shared/stores/tag';
import { TagSearchListContainer } from './containers';

export default function TagPage() {
  const dispatch = useAppDispatch();

  const loadAllTags = useCallback(() => {
    dispatch(effTagAllSearchLoad());
  }, [dispatch]);

  useEffect(loadAllTags, [loadAllTags]);

  return <TagSearchListContainer />;
}
