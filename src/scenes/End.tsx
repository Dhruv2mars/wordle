import React, { useEffect, useMemo, useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { nextUtcMidnight, formatHMS } from '../utils/time';
import { buildShare } from '../utils/share';

type Summary = { name: 'end'; win: boolean; rows: number; states: ('g'|'y'|'b')[][]; answer: string };

export function End({ summary, onHome, onPlay }: { summary: Summary; onHome: () => void; onPlay: () => void }) {
  const [remaining, setRemaining] = useState(() => Math.max(0, nextUtcMidnight().getTime() - Date.now()));
  useEffect(() => {
    const id = setInterval(() => setRemaining(Math.max(0, nextUtcMidnight().getTime() - Date.now())), 250);
    return () => clearInterval(id);
  }, []);

  const [copied, setCopied] = useState<string>('');

  useInput((input, key) => {
    if (key.escape) onHome();
    if (input === 'h' || input === 'H') onHome();
    if (input === 'p' || input === 'P') onPlay();
    if (input === 's' || input === 'S') {
      const text = buildShare({ win: summary.win, rows: summary.rows, states: summary.states, date: new Date() });
      const ok = osc52Copy(text);
      setCopied(ok ? 'Copied results to clipboard!' : 'Copied text below — select and copy');
    }
  });

  const showAnswer = !summary.win; // reveal only on loss
  const countdown = formatHMS(remaining);

  return (
    <Box flexDirection="column" alignItems="center" paddingY={1}>
      <Box marginBottom={1}><Text bold>{summary.win ? 'You Win!' : 'Better luck next time'}</Text></Box>
      {showAnswer && (
        <Box marginBottom={1}><Text>Answer: {summary.answer}</Text></Box>
      )}
      <Box marginBottom={1}><Text dimColor>Next puzzle in {countdown}</Text></Box>
      <Box marginTop={1}><Text dimColor>Press S to Share · P to Play Again · H/Esc Home · Ctrl+Q Quit</Text></Box>
      {copied && (
        <Box marginTop={1}><Text color="#b59f3b">{copied}</Text></Box>
      )}
      {copied && (
        <Box marginTop={1}><Text>{buildShare({ win: summary.win, rows: summary.rows, states: summary.states, date: new Date() })}</Text></Box>
      )}
    </Box>
  );
}

function osc52Copy(text: string): boolean {
  if (!process.stdout.isTTY) return false;
  const b64 = Buffer.from(text, 'utf8').toString('base64');
  const seq = `\u001b]52;c;${b64}\u0007`;
  try {
    process.stdout.write(seq);
    return true;
  } catch {
    return false;
  }
}

