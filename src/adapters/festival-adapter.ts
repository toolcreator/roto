export interface FestivalAdapter {
  getBands: () => string[];
  getRunningOrder: () => {
    band: string,
    stage: string,
    start: Date,
    end: Date
  }[];
}
