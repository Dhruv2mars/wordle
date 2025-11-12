import React, { useMemo, useState } from 'react';
import { Box, Text, useInput } from 'ink';
import chalk from 'chalk';
import allowed from '../word/allowed.json';
import solutions from '../word/solutions.json';
import { scoreGuess } from '../engine/daily';

const WORD_LEN = 5;
const MAX_ROWS = 6;

type CellState = 'empty' | 'fill' | 'b' | 'y' | 'g';

const NYT_COLORS = {
  bg: '#121213',
  emptyBorder: '#3a3a3c',
  text: '#d7dadc',
  b: '#3a3a3c',
  y: '#b59f3b',
  g: '#538d4e',
};

function Tile({ ch, state }: { ch: string; state: CellState }) {
  const W = 3; // tile width
  const letter = ch ? ch.toUpperCase() : ' ';
  let bg = NYT_COLORS.bg;
  let fg = NYT_COLORS.text;
  if (state === 'b') bg = NYT_COLORS.b;
  if (state === 'y') bg = NYT_COLORS.y;
  if (state === 'g') bg = NYT_COLORS.g;
  const core = ` ${letter} `;
  if (state === 'empty' || state === 'fill') {
    // draw a subtle border using box character
    const border = chalk.hex(NYT_COLORS.emptyBorder)('□');
    return <Text>{border}{chalk.bgHex(bg).hex(fg)(core)}{border}</Text>;
  }
  return <Text>{chalk.bgHex(bg).hex(fg)(core)}</Text>;
}

function Row({ word, states }: { word: string; states: CellState[] }) {
  const chars = (word.padEnd(WORD_LEN).slice(0, WORD_LEN)).split('');
  return (
    <Box>
      {chars.map((c, i) => (
        <Box key={i} marginRight={1}><Tile ch={c} state={states[i] ?? 'empty'} /></Box>
      ))}
    </Box>
  );
}

export function Game() {
  const answer = useMemo(() => (solutions[0] || 'ARISE').toUpperCase(), []);
  const [rows, setRows] = useState<string[]>([]);
  const [current, setCurrent] = useState('');
  const [states, setStates] = useState<CellState[][]>([]);
  const [message, setMessage] = useState<string>('');
  const [win, setWin] = useState(false);
  const done = win || rows.length === MAX_ROWS;

  useInput((input, key) => {
    if (done) return;
    if (key.return) {
      if (current.length < WORD_LEN) {
        setMessage('Not enough letters');
        return;
      }
      const guess = current.toUpperCase();
      // Accept any A–Z 5-letter word for now; TODO: full dictionary validation
      if (!/^[A-Z]{5}$/.test(guess)) {
        setMessage('Invalid characters');
        return;
      }
      const s = scoreGuess(guess, answer) as CellState[];
      setRows(r => [...r, guess]);
      setStates(st => [...st, s]);
      setCurrent('');
      setMessage('');
      if (guess === answer) setWin(true);
      return;
    }
    if (key.backspace || key.delete) {
      setCurrent(c => c.slice(0, -1));
      return;
    }
    if (/^[a-zA-Z]$/.test(input) && current.length < WORD_LEN) {
      setCurrent(c => (c + input).toUpperCase());
      setMessage('');
    }
  });

  const boardRows: { word: string; st: CellState[] }[] = [];
  for (let i = 0; i < MAX_ROWS; i++) {
    if (i < rows.length) {
      boardRows.push({ word: rows[i], st: states[i] });
    } else if (i === rows.length) {
      const st = Array<CellState>(WORD_LEN).fill('fill');
      boardRows.push({ word: current, st });
    } else {
      boardRows.push({ word: '', st: Array<CellState>(WORD_LEN).fill('empty') });
    }
  }

  return (
    <Box flexDirection="column" alignItems="center" paddingY={1}>
      <Box marginBottom={1}>
        <Text bold color={NYT_COLORS.text}>WORDIE</Text>
      </Box>
      <Box flexDirection="column" gap={1}>
        {boardRows.map((r, i) => (
          <Box key={i} justifyContent="center"><Row word={r.word} states={r.st} /></Box>
        ))}
      </Box>
      <Box marginTop={1}>
        <Text color={message ? '#b59f3b' : undefined} dimColor={!message}>
          {message || (done ? (win ? 'You win! — Esc to Home · Ctrl+Q to exit' : 'Out of rows — Esc to Home · Ctrl+Q to exit') : 'Type letters, Enter to submit, Backspace to edit · Esc to Home · Ctrl+Q to quit')}
        </Text>
      </Box>
    </Box>
  );
}
