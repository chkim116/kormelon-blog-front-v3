import { Box } from '@mui/material';
import { MuiMarkdown } from '@common/components/MuiMarkdown';

interface PostContentProps {
  content: string;
}

export const PostContent = ({ content }: PostContentProps) => (
  <Box px={{ xs: 2, md: 0 }} py={{ xs: 6, md: 12 }}>
    <Box maxWidth="md" m="0 auto">
      <MuiMarkdown>{content}</MuiMarkdown>
    </Box>
  </Box>
);
