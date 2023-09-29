'use client';
import { useEffect, useState } from 'react';
import { Textarea } from '@nextui-org/react';

interface BlogDetailCommentBodyTextProps {
  value: string;
  editable: boolean;
  onChange: (name: string, value: string) => void;
}

export const BlogDetailCommentBodyText = ({
  value,
  editable,
  onChange,
}: BlogDetailCommentBodyTextProps) => {
  const [editValue, setEditValue] = useState(value);

  const handleChange = (value: string) => {
    setEditValue(value);
    onChange('commentValue', value);
  };

  useEffect(() => {
    setEditValue(value);
  }, [editable, value]);

  return (
    <div className="p-3">
      {editable ? (
        <Textarea
          aria-label="댓글 수정 입력"
          size="lg"
          value={editValue}
          onValueChange={handleChange}
        />
      ) : (
        <p className="">{value}</p>
      )}
    </div>
  );
};
