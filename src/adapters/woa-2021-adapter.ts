import { FestivalAdapter, Gig } from './festival-adapter';
import axios from 'axios';

const HTTP_OK = 200;
const BAND_URL = 'https://www.wacken.com/de/programm/bands/?type=1541083944&tx_woamanager_pi2%5Bfestival%5D=5&tx_woamanager_pi2%5Bperformance%5D=1&tx_woamanager_pi2%5Baction%5D=list&tx_woamanager_pi2%5Bcontroller%5D=AssetJson';

export class WOA2021Adapter implements FestivalAdapter {
    public async getBands(): Promise<string[]> {
        const response = await axios.get(BAND_URL);
        if(response.status == HTTP_OK) {
            const bands: string[] = [];
            for(const asset of response.data) {
                bands.push(asset.artist.title);
            }
            return bands;
        } else {
            throw(new Error(response.statusText + '(' + response.status + ')'));
        }
    }

    public async getRunningOrder(): Promise<Gig[]> {
        throw new Error('WOA2021Adapter.getRunningOrder() is not yet implemented!');
    }
}
