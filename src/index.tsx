import React from 'react';
import { createRoot } from 'react-dom/client';

import { Demo } from 'features/demo/Demo';
import 'shared/styles/index.scss';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<Demo />);
