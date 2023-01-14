import { MouseEventHandler, useCallback } from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { BlogPostAnchorModel } from '@features/blog/models';
import { PostUtils } from './PostUtils';

interface PostFloatingProps {
  activeAnchorId: string;
  anchors: BlogPostAnchorModel[];
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
    <List
      sx={{
        position: 'sticky',
        alignSelf: 'flex-start',
        top: 100,
        mt: 12,
        p: 2,
        bgcolor: 'background.paper',
        display: 'none',
        ['@media (min-width: 1400px)']: {
          display: 'flex',
        },
        flexDirection: 'column',
      }}
    >
      {anchors.map(({ id, value }) => (
        <ListItem key={id} sx={{ p: 0, display: 'flex', alignItems: 'center' }}>
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
                  color: activeAnchorId === id ? 'secondary' : 'text.secondary',
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
  );
};
