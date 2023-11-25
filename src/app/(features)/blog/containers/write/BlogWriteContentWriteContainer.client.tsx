'use client';
import { useRef } from 'react';
import { BlogWriteCreateUiParams } from '@domain/blog/write/blogWrite.uiState';
import { useActionState } from 'src/app/shared/hooks/useActionState';
import { toast } from 'src/app/shared/services/ToastService';
import { actBlogWriteImageUpload } from '@app/blog/actions/blogWrite.action';
import {
  BlogWriteContent,
  BlogWriteContentHandle,
} from '@app/blog/components/write/BlogWriteContent';

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
      onError({ message }) {
        toast.open('error', message);
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
