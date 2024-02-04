import { actCategoriesLoad } from '@app/settings/category/actions/category.action';
import { CategoriesLandingContent } from './components/CategoriesLandingContent';
import { Categories } from './components/Categories';

export default async function CategoriesPage() {
  const { data: categories } = await actCategoriesLoad();

  return (
    <>
      <CategoriesLandingContent />
      <Categories categories={categories} />
    </>
  );
}
