import { FestivalAdapter } from './festival-adapter'
import { WOA2021Adapter } from './woa-2021-adapter';

export enum FestivalAdapters {
  NONE,
  WOA2021
}

export const FESTIVAL_ADAPTER_NAMES = new Map<string, FestivalAdapters>([
  ['none', FestivalAdapters.NONE],
  ['W:O:A 2021', FestivalAdapters.WOA2021]
]);

export const FESTIVAL_ADAPTERS = new Map<FestivalAdapters, FestivalAdapter>([
  [FestivalAdapters.NONE, null],
  [FestivalAdapters.WOA2021, new WOA2021Adapter()]
]);
