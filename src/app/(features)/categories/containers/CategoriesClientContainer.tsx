'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/stores';
import { effCategoriesLoad, selCategories } from '@shared/stores/category';
import { toast } from '@shared/services';
import { Categories } from '../components';

export function CategoriesClientContainer() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selCategories);

  useEffect(() => {
    dispatch(effCategoriesLoad())
      .unwrap()
      .catch((err) => toast.open('error', err.message));
  }, [dispatch]);

  return <Categories categories={categories} />;
}
