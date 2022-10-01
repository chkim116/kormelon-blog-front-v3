import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
  e2e: {
    env: {
      serverApi: 'http://localhost:4000/api',
    },
    baseUrl: 'http://localhost:3000',
  },
});
