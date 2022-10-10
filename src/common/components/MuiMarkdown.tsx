import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Paper, Theme, Typography, useTheme } from '@mui/material';
import * as Markdown from 'mui-markdown';

const ContentStyled = styled.div`
  & p {
    margin: 0;
    line-height: 2rem;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }

  img {
    width: 100%;
    object-fit: contain;
  }
`;

interface MuiMarkdownProps {
  children: string;
}

interface BlockquoteProps {
  children: ReactNode;
}

const MuiMarkdownOverrides = (theme: Theme) => ({
  h1: {
    props: {
      fontSize: '2em',
    },
  },
  h2: {
    props: {
      fontSize: '1.5em',
    },
  },
  h3: {
    props: {
      fontSize: '1.17em',
    },
  },
  h4: {
    props: {
      fontSize: '1em',
    },
  },
  blockquote: {
    component: ({ children }: BlockquoteProps) => (
      <Paper
        component="blockquote"
        variant="outlined"
        sx={{
          m: 0,
          p: '0.8em',
          border: 0,
          borderRadius: 0,
          backgroundColor: 'background.paper',
          borderLeft: '4px solid',
          borderLeftColor: `${theme.palette.info.main}`,
          color: 'text.secondary',
          '& *': {
            p: 0,
            m: 0,
          },
          '& p': {
            p: 0,
          },
        }}
      >
        {children}
      </Paper>
    ),
    props: {
      padding: 0,
    },
  },
});

export const MuiMarkdown = ({ children }: MuiMarkdownProps) => {
  const theme = useTheme();

  return (
    <Typography variant="body1" component={ContentStyled}>
      <Markdown.default
        options={{
          slugify: (str) => str,
          overrides: MuiMarkdownOverrides(theme),
        }}
      >
        {children}
      </Markdown.default>
    </Typography>
  );
};