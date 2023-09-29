import { ComponentProps, useRef, useState } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { Button } from '@nextui-org/react';
import {
  LayoutSearchModal,
  LayoutSearchModalHandle,
} from '../LayoutSearchModal';

interface StoryProps extends ComponentProps<typeof LayoutSearchModal> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'shared/layout/LayoutSearchModal',
  component: LayoutSearchModal,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => {
  const refModal = useRef<LayoutSearchModalHandle>(null);

  const [value, setValue] = useState('');

  const handleOpen = () => {
    refModal.current?.open().then(setValue);
  };

  return (
    <>
      <Button onPress={handleOpen}>검색창 오픈</Button>
      <LayoutSearchModal {...props} ref={refModal} />
      <h2>search value: {value}</h2>
    </>
  );
};

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {},
};
