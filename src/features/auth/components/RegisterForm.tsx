import React, { ChangeEventHandler, FormEventHandler } from 'react';
import { LockOutlined } from '@mui/icons-material';
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';

const ImageWrap = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 12px;
`;

interface RegisterFormProps {
  profileImage: string;
  errorFieldNames: string[];
  isLoading: boolean;
  onSubmit: () => void;
  onChange: (name: string, value: string) => void;
  onUpload: (file: File) => void;
}

export const RegisterForm = ({
  isLoading,
  profileImage,
  errorFieldNames,
  onSubmit,
  onChange,
  onUpload,
}: RegisterFormProps) => {
  const isErrorField = (name: string) => errorFieldNames.includes(name);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    onSubmit();
  };

  const handleChange: ChangeEventHandler<HTMLFormElement> = (e) => {
    const { name, value } = e.target;

    if (!name) {
      return;
    }

    onChange(name, value);
  };

  const handleUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) {
      return;
    }

    onUpload(e.target.files[0]);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          onChange={handleChange}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            error={isErrorField('email')}
            helperText={isErrorField('email') && '해당 값을 입력해 주세요.'}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={isErrorField('password')}
            helperText={isErrorField('password') && '해당 값을 입력해 주세요.'}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="username"
            label="Username"
            type="text"
            id="username"
            error={isErrorField('username')}
            helperText={isErrorField('username') && '해당 값을 입력해 주세요.'}
          />

          <Box mt={4}>
            <ImageWrap>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                }}
                src={profileImage}
              />
            </ImageWrap>
            <Button variant="outlined" component="label" fullWidth>
              Upload Profile
              <input
                accept="image/*"
                type="file"
                hidden
                onChange={handleUpload}
              />
            </Button>
          </Box>

          <Divider sx={{ my: 4 }} />

          <LoadingButton
            loading={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign up
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
};
