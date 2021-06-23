import axios from 'axios';

export class RestCountriesRepository {
    private _url: string = 'https://restcountries.eu/rest/v2/';

    async get(): Promise<any[]> {
        const results = await axios.get(`${this._url}all`);
        return results.data;
    }

    async getByCurrency(currency: string): Promise<any[]> {
        const results = await axios.get(`${this._url}currency/${currency}`);
        return results.data;
    }

    async getByRegion(region: string): Promise<any[]> {
        const results = await axios.get(`${this._url}region/${region}`);
        return results.data;
    }
}

