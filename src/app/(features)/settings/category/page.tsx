import { actSharedCheckAdmin } from 'src/app/shared/actions/sharedAuth.action';
import { actCategoriesLoad } from './actions/category.action';
import { SettingsCategoryCreatorContainer } from './containers/SettingsCategoryCreatorContainer';
import { SettingsCategoryListContainer } from './containers/SettingsCategoryListContainer';

export const dynamic = 'force-dynamic';

export default async function SettingCategoryPage() {
  const { isError } = await actSharedCheckAdmin();

  if (isError) {
    throw new Error();
  }

  const { data: categories } = await actCategoriesLoad();

  return (
    <>
      <SettingsCategoryCreatorContainer />
      <SettingsCategoryListContainer categories={categories} />
    </>
  );
}
