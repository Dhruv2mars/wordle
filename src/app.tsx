import React, { useState } from 'react';
import { Box, useApp, useInput } from 'ink';
import { Splash } from './scenes/Splash';
import { Game } from './scenes/Game';

export function App() {
  const [scene, setScene] = useState<'splash'|'game'>('splash');
  const { exit } = useApp();

  useInput((input, key) => {
    if (key.ctrl && (input === 'q' || input === 'Q')) {
      exit();
    }
    if (key.escape && scene === 'game') {
      setScene('splash');
    }
  });
  return (
    <Box flexDirection="column" width={process.stdout.columns || 80}>
      {scene === 'splash' ? (
        <Splash onStart={() => setScene('game')} />
      ) : (
        <Game />
      )}
    </Box>
  );
}
