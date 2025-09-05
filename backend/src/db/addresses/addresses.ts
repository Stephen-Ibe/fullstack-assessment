import { connection } from "../connection";
import { selectAddressesByUserIds } from "./query-templates";
import { Address, AddressByUserId } from "./types";

export const getAddressesByUserIds = (
  userIds: string[]
): Promise<AddressByUserId> =>
  new Promise((resolve, reject) => {
    if (!userIds.length) {
      resolve({});
      return;
    }

    const query = selectAddressesByUserIds(userIds.length);

    connection.all(query, userIds, (error, results) => {
      if (error) {
        reject(error);
        return;
      }

      const grouped: AddressByUserId = {};

      (results as Address[]).forEach((addr) => {
        if (
          !addr ||
          typeof addr.user_id !== "string" ||
          typeof addr.street !== "string" ||
          typeof addr.city !== "string" ||
          typeof addr.state !== "string" ||
          typeof addr.zipcode !== "string"
        ) {
          return;
        }
        if (!grouped[addr.user_id]) grouped[addr.user_id] = [];
        grouped[addr.user_id].push(addr);
      });
      resolve(grouped);
    });
  });
