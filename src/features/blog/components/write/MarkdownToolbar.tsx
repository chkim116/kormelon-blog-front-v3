/* eslint-disable jsx-a11y/alt-text */
'use client';

import { Button, ButtonGroup } from '@nextui-org/react';
import {
  Bold,
  Code,
  Heading,
  Image,
  Italic,
  Link,
  List,
  ListOrdered,
  SquareCode,
  Strikethrough,
} from 'lucide-react';

export type MarkdownToolbarType =
  | 'bold'
  | 'italic'
  | 'orderedList'
  | 'unorderedList'
  | 'lineThough'
  | 'link'
  | 'code'
  | 'codeblock'
  | 'image'
  | 'heading';

export interface MarkdownToolbarClickArgs {
  prefix: string;
  suffix: string;
}

interface MarkdownToolbarProps {
  onToolbarClick: (args: MarkdownToolbarClickArgs) => void;
}

const MARKDOWN_TOOLBAR_DTO_DIC: Record<
  MarkdownToolbarType,
  MarkdownToolbarClickArgs
> = {
  bold: {
    prefix: '**',
    suffix: '**',
  },
  italic: {
    prefix: '*',
    suffix: '*',
  },
  orderedList: {
    prefix: '1. ',
    suffix: '',
  },
  unorderedList: {
    prefix: '- ',
    suffix: '',
  },
  lineThough: {
    prefix: '~~',
    suffix: '~~',
  },
  link: {
    prefix: '[',
    suffix: ']()',
  },
  code: {
    prefix: '`',
    suffix: '`',
  },
  codeblock: {
    prefix: '```\n',
    suffix: '\n```',
  },
  image: {
    prefix: '![](',
    suffix: ')',
  },
  heading: {
    prefix: '## ',
    suffix: '',
  },
};

// TODO: embed?
export default function MarkdownToolbar({
  onToolbarClick,
}: MarkdownToolbarProps) {
  const handleToolbarClickCurried = (type: MarkdownToolbarType) => () => {
    onToolbarClick(MARKDOWN_TOOLBAR_DTO_DIC[type]);
  };

  return (
    <ButtonGroup
      className="flex justify-start bg-content2 mx-[-1rem] px-4"
      isIconOnly
      variant="light"
    >
      <Button onClick={handleToolbarClickCurried('heading')}>
        <Heading size={16} />
      </Button>
      <Button onClick={handleToolbarClickCurried('bold')}>
        <Bold size={16} />
      </Button>
      <Button onClick={handleToolbarClickCurried('italic')}>
        <Italic size={16} />
      </Button>
      <Button onClick={handleToolbarClickCurried('orderedList')}>
        <ListOrdered size={16} />
      </Button>
      <Button onClick={handleToolbarClickCurried('unorderedList')}>
        <List size={16} />
      </Button>
      <Button onClick={handleToolbarClickCurried('lineThough')}>
        <Strikethrough size={16} />
      </Button>
      <Button onClick={handleToolbarClickCurried('link')}>
        <Link size={16} />
      </Button>
      <Button onClick={handleToolbarClickCurried('code')}>
        <Code size={16} />
      </Button>
      <Button onClick={handleToolbarClickCurried('codeblock')}>
        <SquareCode size={16} />
      </Button>
      <Button onClick={handleToolbarClickCurried('image')}>
        <Image size={16} />
      </Button>
    </ButtonGroup>
  );
}
