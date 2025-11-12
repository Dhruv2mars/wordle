#!/usr/bin/env node
import { render } from 'ink';
import React from 'react';
import { App } from './app';

// Entry point; keep minimal sync work before first frame.
render(<App />);
