'use client';

import {
  DragEventHandler,
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '@nextui-org/react';
import { indentWithTab } from '@codemirror/commands';
import { useDebouncedCallback } from 'use-debounce';
import {
  EditorView,
  keymap,
  placeholder as placeholderExtension,
} from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { minimalSetup } from 'codemirror';
import { padRight, isString } from 'safers';
import { getNextSelectionPosition } from '@shared/utils/markdown.utils';
import { MarkdownToolbarClickArgs } from './MarkdownToolbar';

export interface MarkdownEditorHandle {
  focus: () => void;
  insert: (args: MarkdownToolbarClickArgs) => void;
  setImage: (image: string) => void;
}

interface MarkdownEditorProps {
  initialValue: string;
  placeholder: string;
  height: number | string;
  onDrop: (fd: FormData) => void;
  onChange: (value: string) => void;
}
const EDITOR_ID = 'editor';

const MarkdownEditor = forwardRef<MarkdownEditorHandle, MarkdownEditorProps>(
  (
    {
      initialValue,
      placeholder = '어떤 멋진 글을 쓰고 싶으신가요?',
      height = 500,
      onChange,
      onDrop,
    },
    ref,
  ) => {
    const refView = useRef<EditorView | null>(null);
    const [isDrag, setIsDrag] = useState(false);

    const debouncedChangeHandler = useDebouncedCallback(onChange, 200);
    const refChangeHandler = useRef(onChange);

    const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];

      const fd = new FormData();
      fd.append('image', file);

      setIsDrag(false);

      onDrop(fd);
    };

    const handleDragOver: DragEventHandler<HTMLInputElement> = (e) => {
      e.preventDefault();
      setIsDrag(true);
    };

    const handleDragLeave = () => {
      setIsDrag(false);
    };

    const handleBlur = () => {
      debouncedChangeHandler.flush();
    };

    useLayoutEffect(() => {
      if (refView.current) {
        return;
      }

      const updateListeners = EditorView.updateListener.of((v) => {
        const { state } = v;
        const value = state.doc.toString();

        refChangeHandler.current(value);
      });

      const viewTheme = EditorView.theme({
        '&': { height: isString(height) ? height : padRight(height, 'px') },
        '&.cm-focused': { outline: 'none' },
        '.cm-scroller': { overflow: 'auto', fontFamily: 'inherit' },
      });

      const state = EditorState.create({
        extensions: [
          minimalSetup,
          EditorView.lineWrapping,
          keymap.of([indentWithTab]),
          placeholderExtension(placeholder),
          updateListeners,
          viewTheme,
        ],
      });

      refView.current = new EditorView({
        state,
        doc: initialValue,
        parent: document.getElementById(EDITOR_ID) as HTMLElement,
      });
    }, [height, initialValue, placeholder]);

    useImperativeHandle(
      ref,
      () => {
        const editor = refView.current;

        return {
          focus() {
            editor?.focus();
          },
          setImage(image: string) {
            if (editor) {
              const [{ from, to }] = editor.state.selection.ranges;

              editor.dispatch({
                changes: {
                  from: from,
                  to: to,
                  insert: `\n![](${image})`,
                },
              });
              editor.focus();
              editor.dispatch({
                selection: {
                  anchor: from + 3,
                  head: to + 3,
                },
              });
            }
          },
          insert(args) {
            if (editor) {
              const [{ from, to }] = editor.state.selection.ranges;

              editor.dispatch({
                changes: {
                  from: from,
                  to: from,
                  insert: args.prefix,
                },
              });
              editor.dispatch({
                changes: {
                  from: to + args.prefix.length,
                  to: to + args.prefix.length,
                  insert: args.suffix,
                },
              });

              const { selectionStart, selectionEnd } = getNextSelectionPosition(
                from,
                to,
                args.prefix,
              );

              editor.focus();
              editor.dispatch({
                selection: {
                  anchor: selectionStart,
                  head: selectionEnd,
                },
              });
            }
          },
        };
      },
      [],
    );

    return (
      <div
        className={cn(
          { 'border-2 border-dashed': isDrag },
          'text-lg w-full h-full',
        )}
      >
        <div
          onBlur={handleBlur}
          id={EDITOR_ID}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        />
      </div>
    );
  },
);

MarkdownEditor.displayName = 'MarkdownEditor';

export default MarkdownEditor;
