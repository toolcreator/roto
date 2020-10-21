export class Gig {
  constructor(readonly band: string, readonly stage: string, readonly start: Date, readonly end: Date) {
    // empty
  }
}

export interface FestivalAdapter {
  getBands: () => Promise<string[]>;
  getRunningOrder: () => Promise<Gig[]>;
}
