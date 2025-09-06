export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: {
    state: string;
    street: string;
    city: string;
    zipcode: string;
  }[];
};
