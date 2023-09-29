'use client';
import { useState } from 'react';
import { Button, Input, Textarea } from '@nextui-org/react';
import { BaseCommentCreateParamsModel } from '@domain/uiStates';
import { createBlogPostCommentCreateParamsModel } from '@domain/manipulates';

interface BlogDetailCommentTextareaProps {
  isAnonymous: boolean;
  onSubmit: (createParams: BaseCommentCreateParamsModel) => Promise<void>;
}

export const BlogDetailCommentTextarea = ({
  isAnonymous,
  onSubmit,
}: BlogDetailCommentTextareaProps) => {
  const [value, setValue] = useState(createBlogPostCommentCreateParamsModel());

  const handleChange = (dto: Partial<BaseCommentCreateParamsModel>) => {
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
      setValue(createBlogPostCommentCreateParamsModel());
    });
  };

  return (
    <div className="mx-auto">
      <Textarea
        variant="bordered"
        value={value.commentValue}
        required
        placeholder="Comment"
        onValueChange={handleChangeText}
      />
      <div className="w-full flex gap-2 justify-end">
        {isAnonymous && (
          <>
            <Input
              required
              value={value.username}
              placeholder="익명"
              variant="bordered"
              className="w-40"
              onValueChange={handleChangeUsername}
            />
            <Input
              type="password"
              value={value.password}
              placeholder="패스워드"
              variant="bordered"
              className="w-40"
              onValueChange={handleChangePassword}
            />
          </>
        )}
        <Button
          className="ml-auto mt-1"
          type="submit"
          color="primary"
          onClick={handleSubmit}
        >
          댓글등록
        </Button>
      </div>
    </div>
  );
};
