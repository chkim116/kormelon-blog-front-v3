import { MouseEventHandler, useCallback } from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { AnchorModel } from '@features/posts/models/post.model';
import { PostUtils } from './PostUtils';

interface PostFloatingProps {
  activeAnchorId: string;
  anchors: AnchorModel[];
  isLiked: boolean;
  onShare: () => void;
  onLike: () => void;
  onAnchorClick: (value: string) => void;
}

export const PostFloating = ({
  activeAnchorId: activeAnchorId,
  anchors,
  isLiked,
  onAnchorClick,
  onLike,
  onShare,
}: PostFloatingProps) => {
  const handleAnchorClickCurried = useCallback(
    (value: string): MouseEventHandler<HTMLAnchorElement> =>
      (e) => {
        e.preventDefault();
        onAnchorClick(value);
      },
    [onAnchorClick],
  );

  return (
    <Box position="absolute" height="100%" right={0}>
      <List
        sx={{
          position: 'sticky',
          alignSelf: 'flex-start',
          top: 100,
          mt: 12,
          p: 2,
          maxWidth: 204,
          bgcolor: 'background.paper',
          display: 'none',
          ['@media (min-width: 1400px)']: {
            display: 'flex',
          },
          flexDirection: 'column',
        }}
      >
        {anchors.map(({ id, value }) => (
          <ListItem key={id} sx={{ p: 0, py: '4px' }}>
            <ListItemText>
              <Typography
                component="a"
                variant="body2"
                p={0}
                m={0}
                whiteSpace="pre-line"
                color={activeAnchorId === id ? 'primary' : 'text.primary'}
                onClick={handleAnchorClickCurried(id)}
                href={value}
                sx={{
                  wordBreak: 'break-all',
                  textDecoration: 'none',
                  '&:hover': {
                    color:
                      activeAnchorId === id ? 'secondary' : 'text.secondary',
                  },
                }}
              >
                {value}
              </Typography>
            </ListItemText>
          </ListItem>
        ))}

        <PostUtils isLiked={isLiked} onLike={onLike} onShare={onShare} />
      </List>
    </Box>
  );
};
