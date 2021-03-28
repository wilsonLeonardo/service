import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "../config/auth.json";

import { User } from "../schemas/User";

export default {
  async auth(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user)
        return res.status(400).json({ message: "Email não encontrado!" });

      if (!(await bcrypt.compare(password, user.password)))
        return res.status(400).json({ message: "Senha incorreta!" });

      user.password = undefined;

      const token = jwt.sign({ id: user.id }, auth.secret, {
        expiresIn: "999 years",
      });

      return res.json({ user, token });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
