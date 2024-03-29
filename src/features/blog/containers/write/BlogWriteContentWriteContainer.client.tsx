'use client';
import { useRef } from 'react';
import { useActionState } from '@common/hooks/useActionState';
import { actBlogWriteImageUpload } from '@features/blog/actions/blogWrite.action';
import {
  BlogWriteContent,
  BlogWriteContentHandle,
} from '@features/blog/components/write/BlogWriteContent';
import { BlogWriteCreateUiParams } from '@features/blog/domains/write/blogWrite.uiState';

interface BlogWriteContentWriteContainerClientProps {
  content: string;
  onChange: (dto: Partial<BlogWriteCreateUiParams>) => void;
}

export const BlogWriteContentWriteContainerClient = ({
  content,
  onChange,
}: BlogWriteContentWriteContainerClientProps) => {
  const refEditor = useRef<BlogWriteContentHandle>(null);

  const { action: handleImageDrop } = useActionState(
    '',
    actBlogWriteImageUpload,
    {
      onSuccess({ data }) {
        refEditor.current?.setImage(data);
        refEditor.current?.focus();
      },
    },
  );

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
