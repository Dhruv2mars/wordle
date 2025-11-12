export function buildShare(opts: { win: boolean; rows: number; states: ('g'|'y'|'b')[][]; date: Date }): string {
  const { win, rows, states, date } = opts;
  const title = `Wordie — ${fmtDate(date)} ${win ? `${rows}/6` : 'X/6'}`;
  const lines: string[] = [];
  for (let i = 0; i < states.length; i++) {
    lines.push(states[i].map(c => toEmoji(c)).join(''));
  }
  return `${title}\n${lines.join('\n')}`;
}

function toEmoji(c: 'g'|'y'|'b'): string {
  if (c === 'g') return '🟩';
  if (c === 'y') return '🟨';
  return '⬛';
}

function fmtDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

