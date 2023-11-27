'use client';

import { Accordion, AccordionItem } from '@nextui-org/react';
import {
  CategorySearchUiState,
  CategoryUpdateUiParams,
  SubCategoryUpdateUiParams,
} from '@domain/category/category.uiState';
import {
  SettingsCategoryCategoryItem,
  SettingsSubCategoryCreateArgs,
} from './SettingsCategoryCategoryItem';
import { SettingsCategorySubCategoryItem } from './SettingsCategorySubCategoryItem';

interface SettingsCategoryCategoryListProps {
  categories: CategorySearchUiState[];
  onCategoryUpdateClick: (params: CategoryUpdateUiParams) => void;
  onCategoryDeleteClick: (id: number) => void;
  onSubCreateClick: (args: SettingsSubCategoryCreateArgs) => void;
  onSubUpdateClick: (params: SubCategoryUpdateUiParams) => void;
  onSubDeleteClick: (id: number) => void;
}

export const SettingsCategoryCategoryList = ({
  categories,
  onCategoryUpdateClick,
  onCategoryDeleteClick,
  onSubCreateClick,
  onSubUpdateClick,
  onSubDeleteClick,
}: SettingsCategoryCategoryListProps) => (
  <Accordion variant="splitted" selectionMode="multiple">
    {categories.map(({ subCategories, id, value }) => (
      <AccordionItem
        key={id}
        aria-label={value}
        isCompact
        title={
          <SettingsCategoryCategoryItem
            id={id}
            value={value}
            onSubCreateClick={onSubCreateClick}
            onCategoryDeleteClick={onCategoryDeleteClick}
            onCategoryUpdateClick={onCategoryUpdateClick}
          />
        }
      >
        {subCategories.map(({ id, value }) => (
          <SettingsCategorySubCategoryItem
            key={id}
            id={id}
            value={value}
            onSubUpdateClick={onSubUpdateClick}
            onSubDeleteClick={onSubDeleteClick}
          />
        ))}
      </AccordionItem>
    ))}
  </Accordion>
);
