import React, { ChangeEventHandler, useState } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';

interface CreateSubCategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onOk: (value: string) => void;
}

export const CreateSubCategoryDialog = ({
  isOpen,
  onClose,
  onOk,
}: CreateSubCategoryDialogProps) => {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleOk = () => {
    if (!value) {
      setErrorMessage('값을 입력해 주세요.');
      return;
    }

    onOk(value);
    setValue('');
    setErrorMessage('');
  };

  const handleClose = () => {
    onClose();
    setValue('');
    setErrorMessage('');
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogContent sx={{ p: 6 }}>
        <TextField
          autoComplete="off"
          id="subCategory"
          label="서브 카테고리"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleChange}
          error={!!errorMessage}
          helperText={errorMessage}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>닫기</Button>
        <Button onClick={handleOk} variant="contained">
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};
