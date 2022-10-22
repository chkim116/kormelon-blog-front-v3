import { useMemo } from 'react';
import { Box, Button } from '@mui/material';

interface PostConfirmProps {
  isPrivate: boolean;
  onPrivate: () => void;
}

export const PostConfirm = ({ isPrivate, onPrivate }: PostConfirmProps) => {
  const secretText = useMemo(
    () => (isPrivate ? '비밀 ON' : '비밀 OFF'),
    [isPrivate],
  );

  const handlePrivate = () => {
    onPrivate();
  };

  return (
    <Box display="flex" justifyContent="flex-end" mt={4} gap={2}>
      <Button variant="outlined" onClick={handlePrivate}>
        {secretText}
      </Button>
      <Button type="submit" variant="contained">
        확인
      </Button>
    </Box>
  );
};
