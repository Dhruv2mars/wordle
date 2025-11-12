export type Tick = (now: number, dt: number) => void;

export class Ticker {
  private last = 0;
  private id: any = null;
  private running = false;
  constructor(private fps = 60, private tick: Tick) {}

  start() {
    if (this.running) return;
    this.running = true;
    const interval = 1000 / this.fps;
    this.last = performance.now();
    const loop = () => {
      if (!this.running) return;
      const now = performance.now();
      const dt = now - this.last;
      if (dt >= interval) {
        this.tick(now, dt);
        this.last = now;
      }
      this.id = setTimeout(loop, 0);
    };
    loop();
  }

  stop() {
    this.running = false;
    if (this.id) clearTimeout(this.id);
  }
}
