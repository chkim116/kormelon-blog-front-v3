import { actSharedCheckAdmin } from '@shared/actions/sharedAuth.action';
import { actCategoriesLoad } from '@features/settings/category/actions/category.action';
import { SettingsCategoryCreatorContainer } from '@features/settings/category/containers/SettingsCategoryCreatorContainer';
import { SettingsCategoryListContainer } from '@features/settings/category/containers/SettingsCategoryListContainer';

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
