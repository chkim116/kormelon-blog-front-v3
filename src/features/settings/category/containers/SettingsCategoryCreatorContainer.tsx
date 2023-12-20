'use client';

import { toast } from '@shared/services/ToastService';
import { useFormActionState } from '@shared/hooks/useFormActionState';
import { SubmitButton } from '@shared/components/common/SubmitButton';
import { SettingsCategoryCreator } from '../components/SettingsCategoryCreator';
import { actCategoryCreate } from '../actions/category.action';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SettingsCategoryCreatorContainerProps {}

export const SettingsCategoryCreatorContainer = (
  _: SettingsCategoryCreatorContainerProps,
) => {
  const { formAction: handleSubmit } = useFormActionState(actCategoryCreate, {
    onSuccess({ data }) {
      toast.open('success', `카테고리 ${data} 생성`);
    },
    onError({ message }) {
      toast.open('error', message);
    },
  });

  return (
    <SettingsCategoryCreator onSubmit={handleSubmit}>
      <SubmitButton type="submit" color="primary">
        생성
      </SubmitButton>
    </SettingsCategoryCreator>
  );
};
