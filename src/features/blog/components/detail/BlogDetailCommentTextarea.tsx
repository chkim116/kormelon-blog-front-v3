'use client';
import { useState } from 'react';
import { Input, Textarea } from '@nextui-org/react';
import { CommentCreateUiParams } from '@features/blog/domains/comment/comment.uiState';
import { createCommentCreateUiParams } from '@features/blog/domains/comment/comment.create';
import { SubmitButton } from '@shared/components/common/SubmitButton';

interface BlogDetailCommentTextareaProps {
  isAnonymous: boolean;
  onSubmit: (createParams: CommentCreateUiParams) => Promise<void>;
}

export const BlogDetailCommentTextarea = ({
  isAnonymous,
  onSubmit,
}: BlogDetailCommentTextareaProps) => {
  const [value, setValue] = useState(createCommentCreateUiParams());

  const handleChange = (dto: Partial<CommentCreateUiParams>) => {
    setValue((prev) => ({ ...prev, ...dto }));
  };

  const handleChangeText = (value: string) => {
    handleChange({ commentValue: value });
  };

  const handleChangeUsername = (username: string) => {
    handleChange({ username });
  };

  const handleChangePassword = (password: string) => {
    handleChange({ password });
  };

  const handleSubmit = () => {
    onSubmit(value).then(() => {
      setValue(createCommentCreateUiParams());
    });
  };

  return (
    <div className="mx-auto">
      <Textarea
        variant="bordered"
        value={value.commentValue}
        required
        placeholder="댓글을 작성하세요."
        onValueChange={handleChangeText}
      />
      <form action={handleSubmit} className="w-full flex gap-2 justify-end">
        {isAnonymous && (
          <div className="flex items-center">
            <Input
              required
              size="sm"
              classNames={{
                inputWrapper: 'md:w-40 h-10',
              }}
              value={value.username}
              placeholder="익명"
              variant="bordered"
              onValueChange={handleChangeUsername}
            />
            <Input
              type="password"
              size="sm"
              value={value.password}
              placeholder="패스워드"
              variant="bordered"
              classNames={{
                inputWrapper: 'md:w-40 h-10',
              }}
              onValueChange={handleChangePassword}
            />
          </div>
        )}

        <SubmitButton className="ml-auto mt-1" type="submit" color="primary">
          댓글 작성
        </SubmitButton>
      </form>
    </div>
  );
};
