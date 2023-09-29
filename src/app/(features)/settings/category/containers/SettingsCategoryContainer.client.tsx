'use client';
import { SettingsCategoryCreatorContainer } from './SettingsCategoryCreatorContainer';
import { SettingsCategoryListContainer } from './SettingsCategoryListContainer';

export const SettingsCategoryContainerClient = () => (
  <section className="max-3-xl w-full mx-auto p-6 sm:p-12">
    <SettingsCategoryCreatorContainer />
    <SettingsCategoryListContainer />
  </section>
);
