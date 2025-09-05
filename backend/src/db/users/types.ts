import { Address } from "../addresses";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
}

export interface UserWithAddresses extends User {
  address: Address[];
}

export type Pagination = {
  pageNumber: number;
  pageSize: number;
  totalUsers: number;
};
