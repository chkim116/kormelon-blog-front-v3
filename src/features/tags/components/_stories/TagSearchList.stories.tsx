import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { Container } from '@mui/material';
import { TagWithPostModel } from '@shared/models';
import { TagSearchList } from '../TagSearchList';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof TagSearchList>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'tags/TagSearchList',
  component: TagSearchList,
  argTypes,
} as ComponentMeta<typeof TagSearchList>;

const Template: ComponentStory<typeof TagSearchList> = ({ ...props }) => (
  <Container sx={{ py: 20, display: 'flex', justifyContent: 'flex-start' }}>
    <TagSearchList {...props} />
  </Container>
);

function createTags(length: number): TagWithPostModel[] {
  return Array.from({ length }, (_, i) => ({
    id: i,
    value: `tag-${i}`,
    posts: Array.from({ length: Math.random() * 10 }, (_, i) => i),
  }));
}

export const Default = Template.bind({});
Default.args = {
  tags: createTags(5),
};

export const Many = Template.bind({});
Many.args = {
  tags: createTags(50),
};
