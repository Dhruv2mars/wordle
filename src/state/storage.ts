import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import os from 'os';

function configDir() {
  const platform = process.platform;
  const home = os.homedir();
  if (platform === 'darwin') return join(home, 'Library', 'Application Support', 'wordie-cli');
  if (platform === 'win32') return join(process.env.APPDATA || join(home, 'AppData', 'Roaming'), 'wordie-cli');
  const xdg = process.env.XDG_CONFIG_HOME || join(home, '.config');
  return join(xdg, 'wordie-cli');
}

const FILE = join(configDir(), 'config.json');

export type Config = {
  schema: 1;
  secret: string;
  stats: {
    games: number;
    wins: number;
    streak: number;
    maxStreak: number;
  };
};

export function readConfig(): Config {
  try {
    const txt = readFileSync(FILE, 'utf8');
    const data = JSON.parse(txt);
    return data;
  } catch {
    const cfg: Config = {
      schema: 1,
      secret: Math.random().toString(36).slice(2),
      stats: { games: 0, wins: 0, streak: 0, maxStreak: 0 },
    };
    writeConfig(cfg);
    return cfg;
  }
}

export function writeConfig(cfg: Config) {
  mkdirSync(dirname(FILE), { recursive: true });
  const tmp = FILE + '.tmp';
  writeFileSync(tmp, JSON.stringify(cfg, null, 2));
  writeFileSync(FILE, readFileSync(tmp));
}

