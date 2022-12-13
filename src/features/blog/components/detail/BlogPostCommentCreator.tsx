import React, { useState } from 'react';
import { Box, FormControl, Button } from '@mui/material';
import { BaseCommentCreateParamsModel } from '@features/blog/models';
import { createBlogPostCommentCreateParamsModel } from '@features/blog/manipulates';
import { BlogPostCommentAnonymousField } from './BlogPostCommentAnonymousField';
import { BlogPostCommentTextField } from './BlogPostCommentTextField';

interface BlogPostCommentCreatorProps {
  isAnonymous: boolean;
  onSubmit: (commentValues: Required<BaseCommentCreateParamsModel>) => void;
}

export const BlogPostCommentCreator = ({
  isAnonymous,
  onSubmit,
}: BlogPostCommentCreatorProps) => {
  const [commentValues, setCommentValues] = useState({
    ...createBlogPostCommentCreateParamsModel(),
  });

  const handleChange = (name: string, value: string) => {
    setCommentValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(commentValues);
    setCommentValues((prev) => ({ ...prev, commentValue: '' }));
  };

  return (
    <Box maxWidth="md" m="0 auto" pt={4}>
      <FormControl variant="standard" fullWidth>
        <Box width="100%" mb={2}>
          <BlogPostCommentTextField
            readonly={false}
            value={commentValues.commentValue}
            onChange={handleChange}
          />

          <Box mt={1} display="flex" justifyContent="right">
            {isAnonymous && (
              <BlogPostCommentAnonymousField
                username={commentValues.username}
                password={commentValues.password}
                onChange={handleChange}
              />
            )}

            <Button type="submit" variant="contained" onClick={handleSubmit}>
              댓글 작성
            </Button>
          </Box>
        </Box>
      </FormControl>
    </Box>
  );
};
