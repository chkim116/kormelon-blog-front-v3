import { ComponentProps } from 'react';
import { action } from '@storybook/addon-actions';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';
import { BlogDetailContentNavigation } from '../BlogDetailContentNavigation';
import { BlogDetailContentAction } from '../BlogDetailContentAction';

interface StoryProps
  extends ComponentProps<typeof BlogDetailContentNavigation> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/detail/BlogDetailContentNavigation',
  component: BlogDetailContentNavigation,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <BlogDetailContentNavigation {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    anchors: [
      { id: '1', position: 100, value: faker.lorem.slug() },
      { id: '2', position: 200, value: faker.lorem.slug() },
      { id: '3', position: 300, value: faker.lorem.slug() },
    ],
  },
};

export const Active: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...Default.args,
    activeId: '2',
  },
};

export const ActionContents: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...Default.args,
    actionContents: (
      <BlogDetailContentAction
        isLiked={false}
        onLike={action('onTestLike')}
        onShare={action('onTestShare')}
      />
    ),
  },
};

export const Empty: StoryObj<StoryProps> = {
  render: Template,

  args: {
    anchors: [],
  },
};
