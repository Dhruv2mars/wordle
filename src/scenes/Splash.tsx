import React, { useEffect, useMemo, useState } from 'react';
import { Box, Text } from 'ink';
import { Surface } from '../surface/Surface.js';

export function Splash() {
  // Simple animated logo with gradient background to validate pipeline.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setReady(true), 1000);
    return () => clearTimeout(id);
  }, []);

  return (
    <Box flexDirection="column">
      <Box>
        <Text>Wordie</Text>
      </Box>
      <Box height={8}>
        <Surface width={40} height={8} fps={60} kind="gradient" />
      </Box>
      {ready && (
        <Box marginTop={1}><Text color="gray">Press any key to start...</Text></Box>
      )}
    </Box>
  );
}

