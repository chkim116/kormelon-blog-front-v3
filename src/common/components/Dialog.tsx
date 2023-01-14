import React, { ReactNode, useEffect, useState } from 'react';
import {
  Dialog as MuiDialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

interface DialogProps {
  open?: boolean;
  text?: string;
  extraContent?: ReactNode;
  onOk?: () => void;
  onClose?: () => void;
}

export const Dialog = ({
  open = false,
  text = '',
  extraContent,
  onOk,
  onClose,
}: DialogProps) => {
  const [isOpen, setIsOpen] = useState(open);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const handleOk = () => {
    setIsOpen(false);
    onOk?.();
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <MuiDialog
      open={isOpen}
      onClose={handleClose}
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
        {extraContent}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="error">
          취소
        </Button>
        <Button onClick={handleOk} color="primary" variant="contained">
          확인
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};
