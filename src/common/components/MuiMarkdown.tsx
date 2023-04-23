import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Paper, Theme, Typography, useTheme } from '@mui/material';
import * as Markdown from 'mui-markdown';

const ContentStyled = styled.div`
  & p {
    margin: 0;
    line-height: 1.7777778;
    margin-bottom: 1.1em;
    margin-top: 1.1em;
  }

  h1 {
    margin: 2em 0 0.6em 0;
  }

  h2,
  h3,
  h4 {
    margin: 0.83em 0 0.6em 0;
  }

  img {
    width: 100%;
    max-width: 500px;
    object-fit: contain;
    display: flex;
    margin: 0 auto;
  }

  pre {
    font-family: inherit;
    margin: 0;
  }

  code {
    font-family: inherit;
    font-size: 0.9rem;
    padding: 0.2rem !important;
    margin: 0 !important;
    border: 1px solid #dbdbdb;
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
          my: '0.4em',
          mx: 0,
          p: '0 0.8em',
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
            m: 0,
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
        inlineCodeBgColor="rgb(248, 248, 242)"
        inlineCodeColor="red"
        codeBlockTheme={Markdown.codeBlockThemes.oceanicNext}
      >
        {children}
      </Markdown.default>
    </Typography>
  );
};
