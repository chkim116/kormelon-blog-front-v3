'use client';

import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Input } from '@nextui-org/react';
import { CategoryUpdateUiParams } from '@domain/category/category.uiState';
import { SettingsCategoryExtraAction } from './SettingsCategoryExtraAction';
import {
  SettingsCategorySubCategoryCreator,
  SettingsCategorySubCategoryCreatorHandle,
} from './SettingsCategorySubCategoryCreator';

export interface SettingsSubCategoryCreateArgs {
  id: number;
  value: string;
}

interface SettingsCategoryCategoryItemProps {
  id: number;
  value: string;
  onSubCreateClick: (args: SettingsSubCategoryCreateArgs) => void;
  onCategoryDeleteClick: (id: number) => void;
  onCategoryUpdateClick: (params: CategoryUpdateUiParams) => void;
}

export const SettingsCategoryCategoryItem = ({
  id,
  value,
  onSubCreateClick,
  onCategoryDeleteClick,
  onCategoryUpdateClick,
}: SettingsCategoryCategoryItemProps) => {
  const [editValue, setEditValue] = useState(value);
  const [isEditable, setIsEditable] = useState(false);

  const refSubCreatorModal =
    useRef<SettingsCategorySubCategoryCreatorHandle | null>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEditValue(e.target.value);
  };

  const handleEditableClick = () => {
    setIsEditable((prev) => !prev);
  };

  const handleUpdateClick = () => {
    onCategoryUpdateClick({ categoryId: id, value: editValue });
    setIsEditable((prev) => !prev);
  };

  const handleDeleteClick = () => {
    onCategoryDeleteClick(id);
  };

  const handleOpenSubCreatorClick = () => {
    refSubCreatorModal.current?.open().then((value) => {
      onSubCreateClick({ id, value });
    });
  };

  const handleFocusedClick: MouseEventHandler<HTMLInputElement> = (e) => {
    e.currentTarget.focus();
  };

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  return (
    <div className="flex list-style-none gap-2 items-center justify-between">
      {isEditable ? (
        <>
          <Input
            className="flex-1 z-50"
            onChange={handleChange}
            onClick={handleFocusedClick}
            value={editValue}
            data-cy="edit-category-input"
          />
          <SettingsCategoryExtraAction
            isEditMode={isEditable}
            onEditMode={handleEditableClick}
            onUpdate={handleUpdateClick}
          />
        </>
      ) : (
        <>
          <p className="truncate flex-1">{value}</p>
          <SettingsCategoryExtraAction
            isEditMode={isEditable}
            onEditMode={handleEditableClick}
            onCreate={handleOpenSubCreatorClick}
            onDelete={handleDeleteClick}
          />
        </>
      )}

      <SettingsCategorySubCategoryCreator ref={refSubCreatorModal} />
    </div>
  );
};
