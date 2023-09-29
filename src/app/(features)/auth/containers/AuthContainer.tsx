'use client';
import { useState } from 'react';
import { AuthLoginContainer } from './AuthLoginContainer';
import { AuthRegisterContainer } from './AuthRegisterContainer';

export const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleChangeClick = () => {
    setIsLogin((prev) => !prev);
  };

  if (isLogin) {
    return <AuthLoginContainer onChangeClick={handleChangeClick} />;
  }

  return <AuthRegisterContainer onChangeClick={handleChangeClick} />;
};
