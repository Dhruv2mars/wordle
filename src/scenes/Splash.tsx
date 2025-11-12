import React, { useEffect } from 'react';
import { Box, Text, useInput } from 'ink';

type Props = { onStart: () => void };

export function Splash({ onStart }: Props) {
  useInput(() => onStart());
  useEffect(() => {
    // Auto-start if no input after a short delay
    const id = setTimeout(onStart, 1500);
    return () => clearTimeout(id);
  }, [onStart]);

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
      <Text dimColor>Press any key to start…</Text>
    </Box>
  );
}
