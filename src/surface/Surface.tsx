import React, { useEffect, useRef } from 'react';
import { Box } from 'ink';
import ansiEscapes from 'ansi-escapes';
import { performance } from 'node:perf_hooks';

type Props = {
  width: number;
  height: number;
  fps?: number;
  kind?: 'gradient';
};

export function Surface({ width, height, fps = 60, kind = 'gradient' }: Props) {
  const running = useRef(true);
  const t0 = useRef(performance.now());
  const last = useRef(performance.now());
  const frame = useRef(0);

  useEffect(() => {
    const interval = 1000 / fps;
    const timer = setInterval(() => {
      if (!running.current) return;
      const now = performance.now();
      const dt = now - last.current;
      if (dt < interval) return;
      last.current = now;
      frame.current++;
      draw(kind, width, height, now - t0.current);
    }, 0);
    return () => {
      running.current = false;
      clearInterval(timer);
    };
  }, [fps, width, height, kind]);

  return <Box width={width} height={height} />;
}

function draw(kind: 'gradient', width: number, height: number, tms: number) {
  const t = tms / 1000;
  const w = Math.max(1, Math.floor(width));
  const h = Math.max(1, Math.floor(height));

  let out = '';
  // Anchor at top-left for now; save/restore cursor to avoid disturbing Ink cursor.
  out += ansiEscapes.cursorSavePosition;
  for (let y = 0; y < h; y++) {
    out += ansiEscapes.cursorTo(1, 1 + y);
    const row: string[] = [];
    for (let x = 0; x < w; x++) {
      const u = x / (w - 1 || 1);
      const v = y / (h - 1 || 1);
      const r = Math.floor(127 + 128 * Math.sin(2 * Math.PI * (u + t * 0.2)));
      const g = Math.floor(127 + 128 * Math.sin(2 * Math.PI * (v + t * 0.3)));
      const b = Math.floor(127 + 128 * Math.sin(2 * Math.PI * (u + v + t * 0.15)));
      row.push(`\x1b[48;2;${r};${g};${b}m `);
    }
    // Reset and move down
    out += row.join('') + '\x1b[0m';
    if (y < h - 1) out += '';
  }
  out += ansiEscapes.cursorRestorePosition;
  process.stdout.write(out);
}
