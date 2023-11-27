import { ComponentProps } from 'react';
import { StoryFn, Meta, ArgTypes } from '@storybook/react';
import { TagSearchWithPostCountUiState } from '@domain/tag/tag.uiState';
import { TagSearchList } from '../TagSearchList';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof TagSearchList>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/tags/TagSearchList',
  component: TagSearchList,
  argTypes,
} as Meta<typeof TagSearchList>;

const Template: StoryFn<typeof TagSearchList> = ({ ...props }) => (
  <TagSearchList {...props} />
);

function createTags(length: number): TagSearchWithPostCountUiState[] {
  return Array.from({ length }, (_, i) => ({
    id: i,
    value: `tag-${i}`,
    posts: Array.from({ length: Math.random() * 10 }, (_, i) => i),
  }));
}

export const Default = {
  render: Template,

  args: {
    tags: createTags(5),
  },
};

export const Many = {
  render: Template,

  args: {
    tags: createTags(50),
  },
};
