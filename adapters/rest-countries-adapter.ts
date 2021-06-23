import { Continent } from "../enums/continents";
import { ICountriesRepository } from "../interfaces/ICountriesRepository";
import { ICountry } from "../models/country";
import { RestCountriesRepository } from "../repositories/rest-countries-repository";

export class RestCountriesAdapter implements ICountriesRepository {
    constructor(private _restCountriesRepository: RestCountriesRepository) {}

    private mapRestCountryToICountry(restCountry: any): ICountry {
        return {
            name: restCountry.name,
            capital: restCountry.capital,
            currency: restCountry.currencies[0].code
        };
    }

    private mapRestCountriesToICountryArry(restCountries: any[]): ICountry[] {
        return restCountries.map(rc => this.mapRestCountryToICountry(rc));
    }

    async all(): Promise<ICountry[]> {
        let restCountries = await this._restCountriesRepository.get();
        return this.mapRestCountriesToICountryArry(restCountries);
    }
    async allByCurrency(currency: string): Promise<ICountry[]> {
        let restCountries = await this._restCountriesRepository.getByCurrency(currency);
        return this.mapRestCountriesToICountryArry(restCountries);
    }

    async allByContinent(continent: Continent): Promise<ICountry[]> {
        let region = '';
        if (continent === Continent.NorthAmerica || continent === Continent.SouthAmerica) {
            region = 'americas';
        } else {
            region = Continent[continent];
        }
        let restCountries = await this._restCountriesRepository.getByRegion(region);
        if (continent === Continent.NorthAmerica) {
            return this.mapRestCountriesToICountryArry(restCountries.filter(c => c.subregion === 'Northern America'));
        } else if (continent === Continent.SouthAmerica) {
            return this.mapRestCountriesToICountryArry(restCountries.filter(c => c.subregion !== 'Northern America'));
        } else {
            return this.mapRestCountriesToICountryArry(restCountries);
        }
    }

}