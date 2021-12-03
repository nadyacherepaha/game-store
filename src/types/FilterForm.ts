import { Genres, Ages, Criteria, Types } from "../constants/filterFormEnum";

export interface IFilterFormValues {
  criteria?: Criteria;
  type?: Types;
  genres?: Genres;
  age?: Ages;
}

export const initialSearchPanelFilterValues = {
  genres: Genres.All,
  age: Ages.All,
  criteria: Criteria.Name,
  type: Types.Ascending,
};

export interface IFilterFormProps extends IFilterFormValues {
  getFilteredResult: (values: IFilterFormValues) => Promise<void>;
}
