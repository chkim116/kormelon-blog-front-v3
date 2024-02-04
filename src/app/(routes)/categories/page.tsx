import { CategoriesLandingContent } from '@features/categories/components/CategoriesLandingContent';
import { Categories } from '@features/categories/components/Categories';
import { actCategoriesLoad } from '@features/settings/category/actions/category.action';

export default async function CategoriesPage() {
  const { data: categories } = await actCategoriesLoad();

  return (
    <>
      <CategoriesLandingContent />
      <Categories categories={categories} />
    </>
  );
}
