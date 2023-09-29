'use client';
import React, { useRef } from 'react';
import { useAppDispatch } from '@shared/stores';
import { BlogPostCreateParams } from '@server/entities';
import {
  BlogWriteContent,
  BlogWriteContentHandle,
} from '@app/blog/components/write';
import { effBlogPostImageUpload } from '@app/blog/stores';

interface BlogWriteContentWriteClientContainerProps {
  content: string;
  onChange: (dto: Partial<BlogPostCreateParams>) => void;
}

export const BlogWriteContentWriteClientContainer = ({
  content,
  onChange,
}: BlogWriteContentWriteClientContainerProps) => {
  const dispatch = useAppDispatch();
  const refEditor = useRef<BlogWriteContentHandle>(null);

  const handleImageDrop = async (file: File) => {
    const payload = await dispatch(effBlogPostImageUpload(file)).unwrap();

    refEditor.current?.setImage(payload);
    refEditor.current?.focus();
  };

  const handleChange = (name: string, value: string) => {
    onChange({ [name]: value });
  };

  return (
    <BlogWriteContent
      ref={refEditor}
      content={content}
      onDrop={handleImageDrop}
      onChange={handleChange}
    />
  );
};
