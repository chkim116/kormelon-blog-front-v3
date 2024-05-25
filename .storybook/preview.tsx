import type { Preview } from '@storybook/react';
import React from 'react';
import { AppProvider } from '../src/providers/AppProvider';
import { useTheme } from 'next-themes';
import { Button } from '@nextui-org/react';
import { Sun, Moon } from 'lucide-react';

import '../src/providers/styles/tailwind.global.css';

export const parameters: Preview['parameters'] = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextjs: {
    appDirectory: true,
  },
};

const GlobalNavForStory = () => {
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="mb-5">
      <Button onClick={handleChangeTheme}>
        {theme === 'dark' ? <Moon /> : <Sun />}
      </Button>
    </div>
  );
};

export const decorators: Preview['decorators'] = [
  (Story) => {
    return (
      <AppProvider>
        <GlobalNavForStory />
        <div className="max-w5xl w-full p-0 m-0">
          <Story />
        </div>
      </AppProvider>
    );
  },
];
