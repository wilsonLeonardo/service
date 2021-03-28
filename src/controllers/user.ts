import { Request, Response } from "express";

import { User } from "../schemas/User";

import { client } from "../config/redis";

export default {
  async index(req: Request, res: Response) {
    try {
      client.get("users", async (err, reply) => {
        if (reply) {
          return res.json(JSON.parse(reply));
        } else {
          const users = await User.find();

          client.set("users", JSON.stringify(users));
          client.expire("users", 20);

          return res.json(users);
        }
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async store(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (await User.findOne({ email })) {
        return res.status(400).json({ message: "Usuário já registrado!" });
      }
      const user = await User.create(req.body);

      return res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
