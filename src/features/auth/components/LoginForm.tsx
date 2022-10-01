import { ChangeEventHandler, FormEventHandler } from 'react';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Container, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

interface LoginFormProps {
  isLoading: boolean;
  errorFieldNames: string[];
  onSubmit: () => void;
  onChange: (name: string, value: string) => void;
}

export const LoginForm = ({
  errorFieldNames,
  isLoading,
  onSubmit,
  onChange,
}: LoginFormProps) => {
  const isErrorField = (name: string) => errorFieldNames.includes(name);

  const handleChange: ChangeEventHandler<HTMLFormElement> = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    onSubmit();
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
          로그인
        </Typography>
        <Box
          component="form"
          onChange={handleChange}
          onSubmit={handleSubmit}
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

          <LoadingButton
            loading={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
};
