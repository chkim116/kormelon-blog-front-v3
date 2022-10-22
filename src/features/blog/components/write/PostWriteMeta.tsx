import { ChangeEventHandler } from 'react';
import { Box, Input, InputLabel, TextField } from '@mui/material';

interface PostWriteMetaProps {
  title: string;
  preview: string;
  onChange: (name: string, value: string) => void;
}

export const PostWriteMeta = ({
  preview,
  title,
  onChange,
}: PostWriteMetaProps) => {
  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box sx={{ display: 'flex', gap: 4, mt: 4 }}>
        <InputLabel sx={{ width: '80px' }} htmlFor="title">
          제목
        </InputLabel>
        <Input
          sx={{ width: '100%' }}
          value={title}
          name="title"
          id="title"
          aria-describedby="post title text"
          onChange={handleChange}
        />
      </Box>

      <Box display="flex" gap={4} mt={4}>
        <InputLabel sx={{ width: '80px' }}>프리뷰</InputLabel>
        <TextField
          value={preview}
          name="preview"
          id="preview"
          onChange={handleChange}
          minRows={4}
          multiline
          aria-label="post preview description"
          placeholder="게시글의 프리뷰를 작성하세요."
          fullWidth
        />
      </Box>
    </Box>
  );
};
