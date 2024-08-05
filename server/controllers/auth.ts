import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { playersModel } from "../models";
import { generateAccessToken } from "../utils/auth";
import { prisma } from "../utils/prisma";

const postSignIn = async (req: Request, res: Response) => {
  try {
    // Get the email and password
    const { identifier, password } = req.body;

    // Get the player from their email
    const player = await prisma.player.findUnique({
      where: {
        identifier: identifier,
      },
    });

    // If there is a player, check their password.
    // If the password matches, generate an access token for them (sign them in).
    // If the password doesn't match, return a 404.
    if (player) {
      const passwordMatch = await bcrypt.compare(password, player.password);
      if (passwordMatch) {
        const accessToken = await generateAccessToken(player.id);
        return res.status(200).json({ accessToken });
      }
    }
    return res.status(404).send("Player identifier or password was incorrect.");
  } catch (error) {
    res.status(500).json({
      message: `There was an error signing in: ${error}`,
      error,
    });
  }
};

const postSignUp = async (req: Request, res: Response) => {
  try {
    // Step 1: Validate email and password
    // Step 2: Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Step 3: Create the player
    const newPlayer = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      identifier: req.body.identifier,
      password: hashedPassword,
    };
    const player = await playersModel.postPlayer(newPlayer);
    // Step 4: Generate an access token.
    const accessToken = await generateAccessToken(player.id);
    // Step 5: Return the response.
    return res.status(201).json({ accessToken });
  } catch (error) {
    res.status(500).json({
      message: `There was an error signing up a new player: ${error}`,
      error,
    });
  }
};

export { postSignIn, postSignUp };
