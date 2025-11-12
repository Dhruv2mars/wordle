import React, { useState } from 'react';
import { Box, useApp, useInput } from 'ink';
import { Splash } from './scenes/Splash';
import { Game } from './scenes/Game';
import { End } from './scenes/End';

type Scene = { name: 'splash' } | { name: 'game' } | { name: 'end', win: boolean, rows: number, states: ('g'|'y'|'b')[][], answer: string };

export function App() {
  const [scene, setScene] = useState<Scene>({ name: 'splash' });
  const { exit } = useApp();

  useInput((input, key) => {
    if (key.ctrl && (input === 'q' || input === 'Q')) {
      exit();
    }
    if (key.escape && scene.name !== 'splash') {
      setScene({ name: 'splash' });
    }
  });
  return (
    <Box flexDirection="column" width={process.stdout.columns || 80}>
      {scene.name === 'splash' && <Splash onStart={() => setScene({ name: 'game' })} />}
      {scene.name === 'game' && (
        <Game onEnd={(summary) => setScene({ name: 'end', ...summary })} />
      )}
      {scene.name === 'end' && (
        <End summary={scene} onHome={() => setScene({ name: 'splash' })} onPlay={() => setScene({ name: 'game' })} />
      )}
    </Box>
  );
}
