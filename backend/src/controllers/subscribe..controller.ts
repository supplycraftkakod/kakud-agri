import { Request, Response } from "express";
import prisma from "../prisma";
import { Prisma } from "@prisma/client";
import nodemailer from 'nodemailer';

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

        const subject = "Thank You for Subscribing to Kakud Agri!";
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Welcome to Kakud Agri!</h2>
                <p>Thank you for subscribing to our newsletter. 🎉</p>
                <p>We’re excited to have you on board! Stay tuned for updates, insights, and everything you need to know about agriculture innovations.</p>
                <p>— The Kakud Agri Team</p>
            </div>
        `;

        await sendRouteEmail(email, subject, htmlContent);

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
            error: "Something went wrong while subscribing."
        });
    }
};

async function sendRouteEmail(to: string, subject: string, htmlContent: string) {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: `${process.env.EMAIL_USER}`,
            pass: `${process.env.EMAIL_PASS}`,
        },
    });

    const mailOptions = {
        from: `"Kakud Agri" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
}