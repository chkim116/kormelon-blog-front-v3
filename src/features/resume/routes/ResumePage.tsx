import React from 'react';
import { Container } from '@mui/material';
import { MuiMarkdown } from '@common/components/MuiMarkdown';

interface ResumePageProps {
  myResume: string;
}

export const ResumePage = ({ myResume }: ResumePageProps) => (
  <Container maxWidth="md" sx={{ py: 8 }}>
    <MuiMarkdown>{myResume}</MuiMarkdown>
  </Container>
);
