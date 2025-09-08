import type { Address } from "./generic.types";

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: Address[];
};

export type UsersCount = {
  count: number;
};

export type UserPaginationData = {
  pageSize: number;
  pageNumber: number;
};
