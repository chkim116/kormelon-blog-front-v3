import { ChangeEventHandler, useEffect, useState } from 'react';
import { TextField, Typography } from '@mui/material';

interface BlogPostCommentTextFieldProps {
  readonly: boolean;
  value: string;
  onChange?: (name: string, value: string) => void;
}

export const BlogPostCommentTextField = ({
  value: outValue,
  readonly,
  onChange,
}: BlogPostCommentTextFieldProps) => {
  const [value, setValue] = useState(outValue);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);

    onChange?.(e.target.name, e.target.value);
  };

  useEffect(() => {
    setValue(outValue);
  }, [outValue]);

  if (readonly) {
    return (
      <Typography
        my={2}
        sx={{
          whiteSpace: 'pre-wrap',
        }}
      >
        {value}
      </Typography>
    );
  }

  return (
    <TextField
      value={value}
      name="commentValue"
      onChange={handleChange}
      minRows={3}
      maxRows={3}
      multiline
      aria-label="post comment"
      placeholder="댓글 작성"
      fullWidth
      sx={{ fontSize: '12px' }}
    />
  );
};
