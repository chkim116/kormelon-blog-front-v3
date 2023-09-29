import { ChangeEventHandler } from 'react';
import { Input, Textarea } from '@nextui-org/react';

interface BlogWriteMetaProps {
  title: string;
  preview: string;
  onChange: (name: string, value: string) => void;
}

export const BlogWriteMeta = ({
  preview,
  title,
  onChange,
}: BlogWriteMetaProps) => {
  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="flex-col gap-4 mt-6">
      <div>
        <Input
          label="제목"
          variant="underlined"
          value={title}
          name="title"
          id="title"
          onChange={handleChange}
        />
      </div>

      <div className="mt-4">
        <Textarea
          variant="bordered"
          labelPlacement="outside"
          label="프리뷰"
          value={preview}
          name="preview"
          id="preview"
          onChange={handleChange}
          minRows={4}
          placeholder="게시글의 프리뷰를 작성하세요."
          fullWidth
        />
      </div>
    </div>
  );
};
