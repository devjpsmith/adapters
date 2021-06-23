import fs from 'fs';
import { Continent } from "../enums/continents";
import { ICountriesRepository } from '../interfaces/ICountriesRepository';
import { ICountry } from "../models/country";

export class CountriesRepository implements ICountriesRepository {
    async all(): Promise<ICountry[]> {
        return Promise.all([Continent.Europe, Continent.NorthAmerica]
            .map(continent => this.allByContinent(continent))).then(results => {
                let consolidated: ICountry[] = [];
                results.forEach(r => consolidated.push(...r));
                return consolidated;
            });
    }

    async allByContinent(continent: Continent): Promise<ICountry[]> {
        return new Promise<ICountry[]>((resolve, reject) => {
            const path = this.getCountryFileByContinent(continent);
            fs.readFile(path, 'utf8', (err, data) => {
                if (err) reject(err);
                var countries = JSON.parse(data);
                resolve(countries);
            })
        });
    }

    async allByCurrency(currency: string): Promise<ICountry[]> {
        const countries = await this.all();
        return countries.filter(c => c.currency === currency);
    }

    private getCountryFileByContinent(continent: Continent): string {
        let fileName = '';
        switch (continent)
        {
            case Continent.NorthAmerica: fileName = 'north-america'; break;
            case Continent.Europe: fileName = 'europe'; break;
        }
        return `./countries/${fileName}.json`;
    }
}