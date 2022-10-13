import {
  useState,
  ChangeEventHandler,
  forwardRef,
  useImperativeHandle,
  useRef,
  DragEventHandler,
  KeyboardEventHandler,
} from 'react';
import { Box, IconButton, InputLabel, Modal, TextField } from '@mui/material';
import { Preview } from '@mui/icons-material';
import { MuiMarkdown } from '@common/components/MuiMarkdown';

interface PostWriteContentProps {
  content: string;
  onDrop: (file: File) => void;
  onChange: (name: string, value: string) => void;
}

export interface PostWriteContentHandle {
  focus: () => void;
  setImage: (image: string) => void;
}

export const PostWriteContent = forwardRef<
  PostWriteContentHandle,
  PostWriteContentProps
>(({ content, onDrop, onChange }, ref) => {
  const refEditor = useRef<HTMLTextAreaElement | null>(null);

  const [isPreview, setIsPreview] = useState(false);

  const handleTabKey: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    const editor = refEditor.current;

    if (!editor) {
      return;
    }

    const { selectionStart, selectionEnd, value } = editor;

    if (e.key !== 'Tab') {
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

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
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
        editor?.setRangeText(
          `\n![alt](${image})`,
          editor.selectionStart,
          editor.selectionEnd,
          'end',
        );
      },
    };
  });

  return (
    <Box>
      <Box display="flex" gap={4} mt={4}>
        <Box>
          <InputLabel sx={{ width: '80px' }}>본문</InputLabel>
          <IconButton onClick={handlePreview}>
            <Preview />
          </IconButton>
        </Box>
        <TextField
          inputRef={refEditor}
          onDrop={handleDrop}
          inputProps={{ onKeyDown: handleTabKey }}
          value={content}
          name="content"
          id="content"
          onChange={handleChange}
          multiline
          minRows={50}
          aria-label="post content"
          placeholder="게시글을 작성하세요."
          sx={{
            width: '100%',
          }}
        />
      </Box>

      <Modal
        open={isPreview}
        onClose={handlePreview}
        sx={{
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '900px',
            width: '100%',
            minHeight: '50vh',
            maxHeight: '100vh',
            overflowY: 'scroll',
            bgcolor: 'background.paper',
            color: 'text.primary',
            borderRadius: '12px',
            p: 4,
          }}
        >
          <MuiMarkdown>{content}</MuiMarkdown>
        </Box>
      </Modal>
    </Box>
  );
});

PostWriteContent.displayName = 'PostWriteContent';
