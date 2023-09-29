'use client';
import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import gravatar from 'gravatar';
import { AuthRegisterParamsModel } from '@domain/uiStates';
import { toast } from '@shared/services';
import {
  effAuthProfileUpload,
  effAuthRegister,
  selAuthLoading,
} from '@shared/stores/auth';
import { useAppDispatch, useAppSelector } from '@shared/stores';
import { AuthRegisterForm } from '../components/AuthRegisterForm';

interface AuthRegisterContainerProps {
  onChangeClick: () => void;
}

const defaultProfileImage = gravatar.url('default', {
  s: '100',
  r: 'pg',
  d: 'retro',
  protocol: 'http',
});

export const AuthRegisterContainer = ({
  onChangeClick,
}: AuthRegisterContainerProps) => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selAuthLoading);

  const [profileImage, setProfileImage] = useState(defaultProfileImage);

  const handleSubmit = (params: AuthRegisterParamsModel) => {
    dispatch(effAuthRegister(params))
      .unwrap()
      .then(onChangeClick)
      .catch((err) => toast.open('error', err.message));
  };

  const handleUpload = async (file: File) => {
    const profileImage = await dispatch(effAuthProfileUpload(file)).unwrap();

    setProfileImage(profileImage);
  };

  return (
    <>
      <AuthRegisterForm
        isLoading={isLoading}
        profileImage={profileImage}
        onSubmit={handleSubmit}
        onUpload={handleUpload}
      />
      <Button
        className="w-full mt-4"
        variant="light"
        data-cy="toLogin"
        onClick={onChangeClick}
      >
        로그인
      </Button>
    </>
  );
};
