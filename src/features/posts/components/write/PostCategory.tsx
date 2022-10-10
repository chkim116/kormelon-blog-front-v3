import { useMemo } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
} from '@mui/material';
import { CategoryEntity } from '@core/entities';

interface PostCategoryProps {
  categories: CategoryEntity[];
  categoryId: number;
  subCategoryId: number;
  onChangeCategory: (name: string, id: number) => void;
}

export const PostCategory = ({
  categories,
  categoryId,
  subCategoryId,
  onChangeCategory,
}: PostCategoryProps) => {
  const categoryValue = useMemo(
    () => categories.find((category) => category.id === categoryId)?.value,
    [categories, categoryId],
  );
  const subCategoryValue = useMemo(
    () =>
      categories
        .find((category) => category.id === categoryId)
        ?.subCategories.find((subCategory) => subCategory.id === subCategoryId)
        ?.value,
    [categories, categoryId, subCategoryId],
  );

  const handleCategoryChange = (e: SelectChangeEvent) => {
    onChangeCategory(e.target.name, Number(e.target.value));
  };

  return (
    <Box mt={6} ml="100px">
      <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="categoryId">Category</InputLabel>
        <Select
          labelId="categoryId"
          name="categoryId"
          value={categoryValue}
          onChange={handleCategoryChange}
          label="Age"
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="subCategoryId">subCategory</InputLabel>
        <Select
          labelId="subCategoryId"
          name="subCategoryId"
          value={subCategoryValue}
          onChange={handleCategoryChange}
        >
          {categories
            .find((category) => category.id === categoryId)
            ?.subCategories.map((subCategory) => (
              <MenuItem key={subCategory.id} value={subCategory.id}>
                {subCategory.value}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};
