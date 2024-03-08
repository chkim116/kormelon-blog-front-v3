import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';
import { action } from '@storybook/addon-actions';
import { blogFixtures } from '@fixtures/blog.fixtures';
import { Markdown } from '@common/components/Markdown';
import { BlogDetailContentLayout } from '../BlogDetailContentLayout';
import { BlogDetailContentNavigation } from '../BlogDetailContentNavigation';
import { BlogDetailContentAction } from '../BlogDetailContentAction';

interface StoryProps extends ComponentProps<typeof BlogDetailContentLayout> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/detail/BlogDetailContentLayout',
  component: BlogDetailContentLayout,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <BlogDetailContentLayout {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    contentComponent: (
      <>
        <Markdown content={blogFixtures.getBlogDetail().content} />
      </>
    ),
    navComponent: (
      <>
        <BlogDetailContentNavigation
          activeId="1"
          anchors={[
            { id: '1', position: 100, value: faker.lorem.slug() },
            { id: '2', position: 200, value: faker.lorem.slug() },
            { id: '3', position: 300, value: faker.lorem.slug() },
          ]}
          actionContents={
            <BlogDetailContentAction
              isLiked={false}
              onShare={action('onTestShare')}
              onLike={action('onLikeClick')}
            />
          }
          onClick={action('onTestClick')}
        />
      </>
    ),
  },
};
