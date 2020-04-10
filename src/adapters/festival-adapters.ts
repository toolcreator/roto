import { FestivalAdapter } from './festival-adapter'

export enum FestivalAdapters {
  NONE
}

export const FESTIVAL_ADAPTER_NAMES = new Map<string, FestivalAdapters>([
  ['none', FestivalAdapters.NONE]
]);

export const FESTIVAL_ADAPTERS = new Map<FestivalAdapters, FestivalAdapter>([
  [FestivalAdapters.NONE, null]
]);
