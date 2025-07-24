import { Request, Response } from "express";
import prisma from "../prisma";
import { Prisma } from "@prisma/client";

export const subscribeToNewsLetter = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;

        if (!email) {
            return res.status(400).json({
                error: "Email is required!",
            });
        }

        await prisma.subscribers.create({
            data: { email }
        });

        return res.status(200).json({
            message: "Thank you for subscribing."
        });

    } catch (error: any) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2002'
        ) {
            return res.status(409).json({
                error: "Email already subscribed!"
            });
        }

        console.error("Subscription error:", error);
        return res.status(500).json({
            error: "Error"
        });
    }
};