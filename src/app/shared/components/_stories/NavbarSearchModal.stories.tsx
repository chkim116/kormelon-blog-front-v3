import { ComponentProps, useRef, useState } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { Button } from '@nextui-org/react';
import {
  NavbarSearchModal,
  NavbarSearchModalHandle,
} from '../NavbarLayoutSearchModal';

interface StoryProps extends ComponentProps<typeof NavbarSearchModal> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'shared/NavbarSearchModal',
  component: NavbarSearchModal,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => {
  const refModal = useRef<NavbarSearchModalHandle>(null);

  const [value, setValue] = useState('');

  const handleOpen = () => {
    refModal.current?.open().then(setValue);
  };

  return (
    <>
      <Button onPress={handleOpen}>검색창 오픈</Button>
      <NavbarSearchModal {...props} ref={refModal} />
      <h2>search value: {value}</h2>
    </>
  );
};

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {},
};
