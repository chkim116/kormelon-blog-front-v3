import { useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { AuthLoginContainer } from '../containers/AuthLoginContainer';
import { AuthRegisterContainer } from '../containers/AuthRegisterContainer';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin((prev) => !prev);
  };

  const handleSuccess = () => {
    setIsLogin(true);
  };

  return (
    <Wrap>
      {isLogin ? (
        <AuthLoginContainer />
      ) : (
        <AuthRegisterContainer onSuccess={handleSuccess} />
      )}
      <Button
        data-cy={isLogin ? 'to-register' : 'to-login'}
        onClick={handleToggle}
      >
        {isLogin ? '회원가입' : '로그인'}
      </Button>
    </Wrap>
  );
};
