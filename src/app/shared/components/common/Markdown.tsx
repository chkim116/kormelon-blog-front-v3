'use client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import NextImage from 'next/image';

interface MarkdownProps {
  content: string;
}

export const Markdown = ({ content }: MarkdownProps) => (
  <ReactMarkdown
    className="prose dark:prose-invert md:prose-lg max-w-3xl prose-pre:p-0"
    remarkPlugins={[remarkGfm]}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    /** @ts-ignore */
    rehypePlugins={[rehypeRaw]}
    components={{
      img({ src, alt }) {
        return (
          <NextImage
            src={src || ''}
            alt={alt || ''}
            sizes="100%"
            width={800}
            height={600}
            className="mx-auto"
          />
        );
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      code({ node, className, children, ref, ...props }) {
        const match = /language-(\w+)/.exec(className || '');
        return match ? (
          <SyntaxHighlighter
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            style={a11yDark as any}
            language={match[1]}
            PreTag="div"
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        ) : (
          <code>{children}</code>
        );
      },
    }}
  >
    {content}
  </ReactMarkdown>
);
