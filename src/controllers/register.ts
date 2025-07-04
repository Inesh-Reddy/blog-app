import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { pgClient } from "../db";
dotenv.config();

const jwt_Secret = process.env.JWT_SECRET;
const salt: string = process.env.SALT_ROUNDS as string;

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const password_hash = await bcrypt.hash(password, parseInt(salt));
    const registerQuery =
      "INSERT INTO users(username, email, password_hash) VALUES($1, $2, $3)";
    await pgClient.query(registerQuery, [username, email, password_hash]);

    console.log(`✅ user: ${username} created successfully.`);
    res.json({
      msg: `✅ user: ${username} created successfully.`,
    });
  } catch (error) {
    console.log(`❌ Error creating user: ${username} - `, error);
    throw error;
  }
};
