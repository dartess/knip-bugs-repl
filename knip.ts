/* eslint-disable import/no-default-export */

import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: [
    'src/index.tsx', // main app
  ],
  ignoreDependencies: ['@types/css-modules', 'ts-node'],
  rules: {
    files: 'off',
  },
};

export default config;
