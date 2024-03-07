import {
  ChangeEventHandler,
  DragEventHandler,
  KeyboardEventHandler,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Button, Textarea } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import { LucideIcon } from '@common/components/LucideIcon';
import { Dialog } from '@common/components/Dialog';

const Markdown = dynamic(
  () => import('@common/components/Markdown').then((comp) => comp.Markdown),
  { ssr: false },
);

interface BlogWriteContentProps {
  content: string;
  onDrop: (fd: FormData) => void;
  onChange: (name: string, value: string) => void;
}

export interface BlogWriteContentHandle {
  focus: () => void;
  setImage: (image: string) => void;
}

export const BlogWriteContent = forwardRef<
  BlogWriteContentHandle,
  BlogWriteContentProps
>(({ content, onDrop, onChange }, ref) => {
  const refEditor = useRef<HTMLTextAreaElement | null>(null);

  const [isPreview, setIsPreview] = useState(false);

  const handleTabKey: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const editor = refEditor.current;

    if (!editor) {
      return;
    }

    const { selectionStart, selectionEnd, value } = editor;

    if (e.key !== 'Tab' || !selectionStart) {
      return;
    }

    e.preventDefault();

    if (selectionStart === selectionEnd) {
      if (!e.shiftKey) {
        return editor.setRangeText('\t', selectionStart, selectionEnd, 'end');
      }

      if (selectionStart > 0 && value[selectionStart - 1] === '\t') {
        return editor.setRangeText(
          '',
          selectionStart - 1,
          selectionEnd,
          'start',
        );
      }
    }
  };

  const handlePreview = () => {
    setIsPreview((prev) => !prev);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.name, e.target.value);
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    const fd = new FormData();
    fd.append('image', file);

    onDrop(fd);
  };

  useImperativeHandle(ref, () => {
    const editor = refEditor.current;

    return {
      focus() {
        editor?.focus();
      },
      setImage(image: string) {
        if (editor) {
          const start = editor.selectionStart || 0;
          const end = editor.selectionEnd || 0;

          editor.setRangeText(`\n![alt](${image})`, start, end, 'end');
          onChange('content', editor.value);
        }
      },
    };
  });

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="flex-col gap-1 mt-1">
        <Button
          variant="light"
          onClick={handlePreview}
          startContent={<LucideIcon name="scan-eye" />}
        >
          본문 확인
        </Button>
        <Textarea
          name="content"
          variant="bordered"
          ref={refEditor}
          value={content}
          onChange={handleChange}
          onKeyDown={handleTabKey}
          onDrop={handleDrop}
          multiple
          maxRows={30}
          minRows={30}
          placeholder="게시글을 작성하세요."
          className="w-full"
        />
      </div>

      <Dialog
        className="max-w-4xl w-full h-[90vh] overflow-y-auto"
        open={isPreview}
        onClose={handlePreview}
      >
        <div className="w-full mx-auto">
          <Markdown content={content} />
        </div>
      </Dialog>
    </div>
  );
});

BlogWriteContent.displayName = 'PostWriteContent';
