import { Genres, Ages, Criteria, Types } from "../constants/filterFormEnum";

export interface IFilterFormValues {
  criteria?: Criteria;
  type?: Types;
  genres?: Genres;
  age?: Ages;
}

export interface IFilterFormProps extends IFilterFormValues {
  getFilteredResult: (values: IFilterFormValues) => Promise<void>;
}
