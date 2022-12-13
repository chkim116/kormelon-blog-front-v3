import React, { ChangeEventHandler } from 'react';
import { Box, TextField } from '@mui/material';

interface BlogPostCommentAnonymousFieldProps {
  username: string;
  password: string;
  onChange: (name: string, value: string) => void;
}

export const BlogPostCommentAnonymousField = ({
  username,
  password,
  onChange,
}: BlogPostCommentAnonymousFieldProps) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.name, e.target.value);
  };

  return (
    <Box display="flex" gap={1} mr={2}>
      <Box>
        <TextField
          sx={{ width: '150px' }}
          size="small"
          type="text"
          name="username"
          placeholder="이름"
          value={username}
          variant="outlined"
          autoComplete="username"
          onChange={handleChange}
        />
      </Box>
      <Box>
        <TextField
          sx={{ width: '150px' }}
          size="small"
          type="password"
          placeholder="비밀번호"
          value={password}
          variant="outlined"
          name="password"
          autoComplete="current-password"
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};
