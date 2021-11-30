export const enum Genres {
  all = "",
  Shooter = "Shooter",
  Sandbox = "Sandbox",
  RPG = "RPG",
  Action = "Action-adventure",
  Simulator = "Simulator",
}

export const enum Age {
  all = "",
  three = 3,
  six = 6,
  twelve = 12,
  sixteen = 16,
  eighteen = 18,
}

export const enum Criteria {
  name = "name",
  rating = "rating",
  price = "price",
}

export const enum Type {
  ascending = "ascending",
  descending = "descending",
}

export interface IFilterFormValues {
  criteria?: Criteria;
  type?: Type;
  genres: Genres;
  age: Age;
}
