import { createHash } from 'crypto';

export function dailyIndex(date: Date, secret: string, len: number): number {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  const key = `${y}-${m}-${d}:${secret}`;
  const hash = createHash('sha256').update(key).digest();
  let n = 0;
  for (let i = 0; i < 4; i++) n = (n << 8) | hash[i];
  return Math.abs(n) % Math.max(1, len);
}

export function scoreGuess(guess: string, answer: string): ('g'|'y'|'b')[] {
  const N = answer.length;
  const res: ('g'|'y'|'b')[] = Array(N).fill('b');
  const counts: Record<string, number> = {};
  for (let i = 0; i < N; i++) {
    if (guess[i] === answer[i]) {
      res[i] = 'g';
    } else {
      const ch = answer[i];
      counts[ch] = (counts[ch] || 0) + 1;
    }
  }
  for (let i = 0; i < N; i++) {
    if (res[i] !== 'g') {
      const ch = guess[i];
      if (counts[ch] > 0) {
        res[i] = 'y';
        counts[ch]--;
      }
    }
  }
  return res;
}

