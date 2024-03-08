import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';
import { Markdown } from '../Markdown';

interface StoryProps extends ComponentProps<typeof Markdown> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'common/Markdown',
  component: Markdown,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => <Markdown {...props} />;

const createContent = () => {
  let blogPost = `## ${faker.company.catchPhrase()}\n`;

  blogPost += `> ${faker.company.catchPhrase()}\n\n`;
  blogPost += `${faker.lorem.paragraphs(2)}\n\n`;
  blogPost += `![faker.js image](${faker.image.imageUrl()})\n\n`;
  blogPost += `${faker.lorem.paragraphs(2)}\n\n`;
  blogPost += `[Read more](${faker.internet.url()})\n\n`;
  blogPost += '---\n';

  return blogPost;
};

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    content: createContent(),
  },
};
