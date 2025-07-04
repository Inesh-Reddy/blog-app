import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { pgClient } from "../db";
dotenv.config();

const jwt_Secret: string = process.env.JWT_SECRET as string;

export const login = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  let fetchQuery;
  let hash;
  try {
    if (username) {
      fetchQuery = `SELECT password_hash FROM users WHERE username = $1`;
      hash = await pgClient.query(fetchQuery, [username]);
    } else {
      fetchQuery = `SELECT password_hash FROM users WHERE email = $1`;
      hash = await pgClient.query(fetchQuery, [email]);
    }
    const hashedPassword = hash.rows[0].password_hash;
    const check = await bcrypt.compare(password, hashedPassword);

    if (check) {
      const token = await jwt.sign(
        {
          data: hashedPassword,
        },
        jwt_Secret,
        { expiresIn: 60 * 60 }
      );
      res.json({
        msg: token,
      });
    }
  } catch (error) {
    console.log(`Error while logging`, error);
    throw error;
  }
};
