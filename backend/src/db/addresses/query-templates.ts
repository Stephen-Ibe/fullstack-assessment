export const selectAddressesByUserIds = (count: number) => `
  SELECT *
  FROM addresses
  WHERE user_id IN (${Array(count).fill("?").join(",")})
`;
