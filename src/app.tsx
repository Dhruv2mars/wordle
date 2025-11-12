import React, { useState } from 'react';
import { Box } from 'ink';
import { Splash } from './scenes/Splash';
import { Game } from './scenes/Game';

export function App() {
  const [scene, setScene] = useState<'splash'|'game'>('splash');
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
