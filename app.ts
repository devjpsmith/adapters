import { RestCountriesAdapter } from "./adapters/rest-countries-adapter";
import { Continent } from "./enums/continents";
import { RestCountriesRepository } from "./repositories/rest-countries-repository";

const restCountriesRepository = new RestCountriesRepository();
const repository = new RestCountriesAdapter(restCountriesRepository);

repository.allByContinent(Continent.NorthAmerica)
    .then(res => console.log(res));
