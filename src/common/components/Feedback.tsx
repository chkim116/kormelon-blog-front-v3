import { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { createRoot } from 'react-dom/client';

export type StatusType = 'error' | 'warning' | 'info' | 'success';

interface FeedbackProps {
  status: StatusType;
  message: string;
}

export const Feedback = ({ message, status }: FeedbackProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={4000}
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      onClose={handleClose}
    >
      <Alert severity={status}>{message}</Alert>
    </Snackbar>
  );
};

export function feedbackService(status: StatusType, message: string) {
  const root = createRoot(document.getElementById('feedback') as HTMLElement);

  return root.render(
    <div data-cy="feedback">
      <Feedback status={status} message={message} />
    </div>,
  );
}
