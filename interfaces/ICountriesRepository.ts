import { Continent } from "../enums/continents";
import { ICountry } from "../models/country";

export interface ICountriesRepository {
    all(): Promise<ICountry[]>;
    allByCurrency(currency: string): Promise<ICountry[]>;
    allByContinent(continent: Continent): Promise<ICountry[]>;
}