export const enum Genres {
  All = "",
  Shooter = "Shooter",
  Sandbox = "Sandbox",
  RPG = "RPG",
  Action = "Action-adventure",
  Simulator = "Simulator",
}

export enum Ages {
  All = "",
  Three = "3",
  Six = "6",
  Twelve = "12",
  Sixteen = "16",
  Eighteen = "18",
}

export const enum Criteria {
  Name = "name",
  Rating = "rating",
  Price = "price",
}

export const enum Types {
  Ascending = "ascending",
  Descending = "descending",
}

export interface IFilterFormValues {
  criteria?: Criteria;
  type?: Types;
  genres?: Genres;
  age?: Ages;
}

export interface IFilterFormProps extends IFilterFormValues {
  getFilteredResult: (values: IFilterFormValues) => Promise<void>;
}
