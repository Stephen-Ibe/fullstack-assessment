import type { Address } from "./generic.types";

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: Address[];
};
