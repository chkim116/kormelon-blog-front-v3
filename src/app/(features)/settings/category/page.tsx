'use client';
import { UserRoleEnum } from '@server/entities';
import { useAppSelector } from '@shared/stores';
import { selUserData } from '@shared/stores/auth';
import { SettingsCategoryContainerClient } from './containers';
import { SettingsCategoryError } from './components';

export default function SettingCategoryPage() {
  const user = useAppSelector(selUserData);

  const isNotAdmin = !user.id || user.role === UserRoleEnum.MEMBER;

  if (isNotAdmin) {
    return <SettingsCategoryError />;
    // throw new Error('접근할 수 없습니다.');
  }

  return <SettingsCategoryContainerClient />;
}
