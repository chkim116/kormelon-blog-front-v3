import { Accordion, AccordionItem, CircularProgress } from '@nextui-org/react';
import {
  CategoryEntity,
  CategoryUpdateParams,
  SubCategoryUpdateParams,
} from '@server/entities';
import {
  SettingsCategoryCategoryItem,
  SettingsSubCategoryCreateArgs,
} from './SettingsCategoryCategoryItem';
import { SettingsCategorySubCategoryItem } from './SettingsCategorySubCategoryItem';

interface SettingsCategoryCategoryListProps {
  loading: boolean;
  categories: CategoryEntity[];
  onCategoryUpdateClick: (params: CategoryUpdateParams) => void;
  onCategoryDeleteClick: (id: number) => void;
  onSubCreateClick: (args: SettingsSubCategoryCreateArgs) => void;
  onSubUpdateClick: (params: SubCategoryUpdateParams) => void;
  onSubDeleteClick: (id: number) => void;
}

export const SettingsCategoryCategoryList = ({
  loading,
  categories,
  onCategoryUpdateClick,
  onCategoryDeleteClick,
  onSubCreateClick,
  onSubUpdateClick,
  onSubDeleteClick,
}: SettingsCategoryCategoryListProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Accordion variant="splitted" selectionMode="multiple">
      {categories.map(({ subCategories, id, value }) => (
        <AccordionItem
          key={id}
          aria-label={value}
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
};
