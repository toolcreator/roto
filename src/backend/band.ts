import { Gig } from './gig';

export class Band {
  constructor(
    public name: string,
    public category: string,
    public gigs: Gig[],
  ) { /* empty */ }
}
