import { ChangeEventHandler } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { toString, toNumber } from 'safers';
import { CategorySearchUiState } from '@features/categories/domains/category.uiState';

interface BlogWriteCategoryProps {
  categories: CategorySearchUiState[];
  categoryId: number;
  subCategoryId: number;
  onChangeCategory: (name: string, id: number) => void;
}

export const BlogWriteCategory = ({
  categories,
  categoryId,
  subCategoryId,
  onChangeCategory,
}: BlogWriteCategoryProps) => {
  const subCategories =
    categories.find((category) => category.id === categoryId)?.subCategories ||
    [];

  const handleCategoryChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    onChangeCategory(e.target.name, toNumber(e.target.value));
  };

  return (
    <div className="flex gap-4 mt-6">
      <Select
        variant="underlined"
        label="상위카테고리"
        data-cy="category-select"
        name="categoryId"
        selectedKeys={[toString(categoryId)]}
        onChange={handleCategoryChange}
        items={categories}
      >
        {(category) => (
          <SelectItem
            data-cy={category.value}
            key={category.id}
            value={category.id}
          >
            {category.value}
          </SelectItem>
        )}
      </Select>
      <Select
        variant="underlined"
        label="하위 카테고리"
        data-cy="sub-category-select"
        name="subCategoryId"
        selectedKeys={[toString(subCategoryId)]}
        onChange={handleCategoryChange}
        items={subCategories}
      >
        {(subCategory) => (
          <SelectItem
            data-cy={subCategory.value}
            key={subCategory.id}
            value={subCategory.id}
          >
            {subCategory.value}
          </SelectItem>
        )}
      </Select>
    </div>
  );
};
