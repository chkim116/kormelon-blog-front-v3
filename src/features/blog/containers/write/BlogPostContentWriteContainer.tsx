import React, { useRef } from 'react';
import { BlogPostCreateParams } from '@core/entities';
import {
  PostWriteContent,
  PostWriteContentHandle,
} from '@features/blog/components/write';

interface BlogPostContentWriteContainerProps {
  content: string;
  onChange: (dto: Partial<BlogPostCreateParams>) => void;
}

export const BlogPostContentWriteContainer = ({
  content,
  onChange,
}: BlogPostContentWriteContainerProps) => {
  const refEditor = useRef<PostWriteContentHandle>(null);

  const handleImageDrop = async (file: File) => {
    const {
      data: { payload },
    } = await repo.post.uploadImage(file);

    refEditor.current?.setImage(payload);
    refEditor.current?.focus();
  };

  const handleChange = (name: string, value: string) => {
    onChange({ [name]: value });
  };

  return (
    <PostWriteContent
      ref={refEditor}
      content={content}
      onDrop={handleImageDrop}
      onChange={handleChange}
    />
  );
};
