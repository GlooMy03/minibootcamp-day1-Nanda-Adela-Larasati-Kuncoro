import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { RegisterInput, LoginInput } from "../models/schemas";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: RegisterInput = req.body;
    const result = await registerUser(data);

    res.status(201).json({
      message: "User registered successfully",
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Registration failed";
    res.status(400).json({ error: message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: LoginInput = req.body;
    const result = await loginUser(data);

    res.status(200).json({
      message: "Login successful",
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    res.status(401).json({ error: message });
  }
};
