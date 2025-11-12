import React from 'react';
import { Box, Text, useInput } from 'ink';

type Props = { onStart: () => void };

export function Splash({ onStart }: Props) {
  useInput(() => onStart());

  return (
    <Box flexDirection="column" alignItems="center" justifyContent="center" height={Math.max(10, process.stdout.rows - 4)}>
      <Box marginBottom={1}><Text color="#d7dadc">
        {`██╗    ██╗ ██████╗ ██████╗ ██████╗ ██╗███████╗\n`}
        {`██║    ██║██╔═══██╗██╔══██╗██╔══██╗██║██╔════╝\n`}
        {`██║ █╗ ██║██║   ██║██████╔╝██║  ██║██║█████╗  \n`}
        {`██║███╗██║██║   ██║██╔══██╗██║  ██║██║██╔══╝  \n`}
        {`╚███╔███╔╝╚██████╔╝██║  ██║██████╔╝██║███████╗\n`}
        {` ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝╚══════╝`}
      </Text></Box>
      <Text dimColor>Press any key to start · Ctrl+Q to quit</Text>
    </Box>
  );
}
