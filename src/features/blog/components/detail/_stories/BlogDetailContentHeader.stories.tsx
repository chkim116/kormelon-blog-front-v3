import { ComponentProps } from 'react';
import { faker } from '@faker-js/faker';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { Markdown } from '@common/components/Markdown';
import { blogFixtures } from '@fixtures/blog.fixtures';
import { BlogDetailContentHeader } from '../BlogDetailContentHeader';
import { BlogDetailContentLayout } from '../BlogDetailContentLayout';

interface StoryProps extends ComponentProps<typeof BlogDetailContentHeader> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/detail/BlogDetailContentHeader',
  component: BlogDetailContentHeader,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <BlogDetailContentHeader {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...blogFixtures.getBlogDetail(),
  },
};

export const WithTags: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...blogFixtures.getBlogDetail(),
    tags: [
      { id: 1, value: faker.lorem.word() },
      { id: 2, value: faker.lorem.word() },
      { id: 3, value: faker.lorem.word() },
    ],
  },
};

export const Author: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...blogFixtures.getBlogDetail(),
    isAuthor: true,
  },
};

const WithContentTemplate: StoryFn<StoryProps> = ({ ...props }) => (
  <>
    <BlogDetailContentHeader {...props} />
    <BlogDetailContentLayout
      contentComponent={
        <Markdown content={blogFixtures.getBlogDetail().content} />
      }
      navComponent={null}
    />
  </>
);

export const WithContent: StoryObj<StoryProps> = {
  render: WithContentTemplate,

  args: {
    ...Default.args,
  },
};
