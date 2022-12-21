import React, { useCallback, useEffect } from 'react';
import { useQueryParser } from '@shared/hooks';
import { useAppDispatch } from '@common/store';
import { feedbackService } from '@common/components';
import { SearchListContainer } from '../containers';
import { effSearchPostsByTagId } from '../stores';

function refineSearchQueries(raw: Record<string, string>) {
  return {
    tagId: isFinite(Number(raw.tagId)) ? Number(raw.tagId) : undefined,
    tagValue: raw.tagValue || '',
  };
}

export const SearchPage = () => {
  const { tagId, tagValue } = useQueryParser(refineSearchQueries);
  const dispatch = useAppDispatch();

  const loadSearchList = useCallback(() => {
    if (!tagId) {
      return;
    }

    dispatch(effSearchPostsByTagId(tagId))
      .unwrap()
      .catch((err) => feedbackService(err.message));
  }, [dispatch, tagId]);

  useEffect(loadSearchList, [loadSearchList]);

  return <SearchListContainer tagValue={tagValue} />;
};
