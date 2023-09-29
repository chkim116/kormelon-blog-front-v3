import {
  useState,
  ChangeEventHandler,
  forwardRef,
  useImperativeHandle,
  useRef,
  DragEventHandler,
  KeyboardEventHandler,
} from 'react';
import { Preview } from '@mui/icons-material';
import { Button, Textarea } from '@nextui-org/react';
import { Dialog, Markdown } from '@shared/components/common';

interface BlogWriteContentProps {
  content: string;
  onDrop: (file: File) => void;
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
  const refEditor = useRef<HTMLInputElement | null>(null);

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

    onDrop(file);
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
          startContent={<Preview />}
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
        className="max-w-4xl w-full"
        open={isPreview}
        onClose={handlePreview}
      >
        <Markdown content={content} />
      </Dialog>
    </div>
  );
});

BlogWriteContent.displayName = 'PostWriteContent';
