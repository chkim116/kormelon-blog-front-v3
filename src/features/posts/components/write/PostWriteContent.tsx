import { useState, ChangeEventHandler } from 'react';
import { Box, IconButton, InputLabel, Modal, TextField } from '@mui/material';
import { Preview } from '@mui/icons-material';
import { MuiMarkdown } from '@common/components/MuiMarkdown';

interface PostWriteContentProps {
  content: string;
  onChange: (name: string, value: string) => void;
}

export const PostWriteContent = ({
  content,
  onChange,
}: PostWriteContentProps) => {
  const [isPreview, setIsPreview] = useState(false);

  const handlePreview = () => {
    setIsPreview((prev) => !prev);
  };

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    onChange(e.target.name, e.target.value);
  };

  return (
    <Box>
      <Box display="flex" gap={4} mt={4}>
        <Box>
          <InputLabel sx={{ width: '80px' }}>본문</InputLabel>
          <IconButton onClick={handlePreview}>
            <Preview />
          </IconButton>
        </Box>
        <TextField
          value={content}
          name="content"
          id="content"
          onChange={handleChange}
          multiline
          minRows={50}
          aria-label="post content"
          placeholder="게시글을 작성하세요."
          sx={{
            width: '100%',
          }}
        />
      </Box>

      <Modal
        open={isPreview}
        onClose={handlePreview}
        sx={{
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '900px',
            width: '100%',
            minHeight: '50vh',
            maxHeight: '100vh',
            overflowY: 'scroll',
            bgcolor: 'background.paper',
            color: 'text.primary',
            borderRadius: '12px',
            p: 4,
          }}
        >
          <MuiMarkdown>{content}</MuiMarkdown>
        </Box>
      </Modal>
    </Box>
  );
};
