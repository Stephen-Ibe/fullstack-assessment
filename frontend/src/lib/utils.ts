import type { Address } from "./types";

export const formatAddress = (address?: Address): string => {
  if (!address) return "-";
  const { street, state, city, zipcode } = address;
  return [street, state, city, zipcode].filter(Boolean).join(", ");
};
