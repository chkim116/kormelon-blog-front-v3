import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@common/store';
import { effAuthLogin, selAuthLoading } from '@shared/stores/auth';
import { feedbackService } from '@common/components/Feedback';
import { LoginForm } from '../components/LoginForm';
import { AuthLoginParamsModel } from '../models/user.model';

export const AuthLoginContainer = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(selAuthLoading);
  const router = useRouter();

  const [form, setForm] = useState<AuthLoginParamsModel>({
    email: '',
    password: '',
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

    dispatch(effAuthLogin(form))
      .unwrap()
      .then(() => router.push('/blog'))
      .catch((err) => {
        feedbackService('error', err.message);
      });
  };

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <LoginForm
      errorFieldNames={errorFieldNames}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      onChange={handleChange}
    />
  );
};
