import React, { useState } from 'react';
import gravatar from 'gravatar';
import { repo } from '@core/repo';
import { useAppDispatch, useAppSelector } from '@common/store';
import { effAuthRegister, selAuthLoading } from '@shared/stores/auth';
import { feedbackService } from '@common/components/Feedback';
import { RegisterForm } from '../components/RegisterForm';
import { AuthRegisterParamsModel } from '../models/user.model';

const defaultProfileImage = gravatar.url('default', {
  s: '100',
  r: 'pg',
  d: 'retro',
  protocol: 'http',
});

interface AuthRegisterContainerProps {
  onSuccess: () => void;
}

export const AuthRegisterContainer = ({
  onSuccess,
}: AuthRegisterContainerProps) => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selAuthLoading);

  const [form, setForm] = useState<AuthRegisterParamsModel>({
    email: '',
    password: '',
    profileImage: defaultProfileImage,
    username: '',
  });
  const [errorFieldNames, setErrorFieldNames] = useState<string[]>([]);

  const handleSubmit = () => {
    setErrorFieldNames([]);

    let isErr = false;

    Object.entries(form).forEach(([key, value]) => {
      if (!value) {
        isErr = true;
        setErrorFieldNames((prev) => [...prev, key]);
      }
    });

    if (isErr) {
      return;
    }

    dispatch(effAuthRegister(form))
      .unwrap()
      .then(() => onSuccess())
      .catch((err) => feedbackService('error', err.response?.data.message));
  };

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = async (file: File) => {
    const profileImage = await repo.auth
      .uploadProfileImage(file)
      .then((res) => res.data.payload);

    setForm((prev) => ({ ...prev, profileImage }));
  };

  return (
    <RegisterForm
      isLoading={isLoading}
      errorFieldNames={errorFieldNames}
      profileImage={form.profileImage}
      onSubmit={handleSubmit}
      onChange={handleChange}
      onUpload={handleUpload}
    />
  );
};
