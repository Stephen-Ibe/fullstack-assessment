import { Request, Response, Router } from "express";

import { Address, getAddressesByUserIds } from "../db/addresses";
import { getUsers, getUsersCount, User, UserWithAddresses } from "../db/users";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const pageNumber = Number(req.query.pageNumber) || 0;
    const pageSize = Number(req.query.pageSize) || 4;

    if (pageNumber < 0 || pageSize < 1) {
      res.status(400).send({ message: "Invalid page number or page size" });
      return;
    }

    const users = await getUsers(pageNumber, pageSize);

    // Attach addresses ("adders") to each user
    const userIds = users.map((u: User) => String(u.id));
    const addressesByUser = await getAddressesByUserIds(userIds);

    const usersWithAddresses: UserWithAddresses[] = users.map((u: User) => {
      const id = String(u.id);
      const addrs: Address[] = addressesByUser[id] || [];
      // Basic validation/formatting: ensure only valid fields are returned
      const sanitized: Address[] = addrs.map((a) => ({
        id: String(a.id),
        user_id: String(a.user_id),
        street: String(a.street),
        city: String(a.city),
        state: String(a.state),
        zipcode: String(a.zipcode),
      }));
      return { ...u, address: sanitized };
    });

    res.send(usersWithAddresses);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch users" });
  }
});

router.get("/count", async (req: Request, res: Response) => {
  try {
    const count = await getUsersCount();
    res.send({ count });
  } catch (e) {
    res.status(500).send({ error: "Failed to fetch user count" });
  }
});

export default router;
