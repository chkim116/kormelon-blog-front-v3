import React, { useRef } from 'react';
import { BlogPostCreateParams } from '@core/entities';
import { useAppDispatch } from '@common/store';
import {
  PostWriteContent,
  PostWriteContentHandle,
} from '@features/blog/components/write';
import { effBlogPostImageUpload } from '@features/blog/stores';

interface BlogPostContentWriteContainerProps {
  content: string;
  onChange: (dto: Partial<BlogPostCreateParams>) => void;
}

export const BlogPostContentWriteContainer = ({
  content,
  onChange,
}: BlogPostContentWriteContainerProps) => {
  const dispatch = useAppDispatch();
  const refEditor = useRef<PostWriteContentHandle>(null);

  const handleImageDrop = async (file: File) => {
    const payload = await dispatch(effBlogPostImageUpload(file)).unwrap();

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
