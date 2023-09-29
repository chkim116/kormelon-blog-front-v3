import type { Preview } from '@storybook/react';
import React from 'react';
import { Provider } from '../src/app/shared/stores/Provider';
import { NextUIProviders } from '../src/app/shared/styles/NextUIProviders';
import '@shared/styles/tailwind.global.css';

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

export const decorators: Preview['decorators'] = [
  (Story) => (
    <Provider>
      <NextUIProviders>
        <div className="max-w5xl w-full p-0 m-0">
          <Story />
        </div>
      </NextUIProviders>
    </Provider>
  ),
];
