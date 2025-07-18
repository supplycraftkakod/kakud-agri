import { Request, Response } from 'express';
import prisma from '../prisma';
import { uploadToCloudinary } from '../utils/cloudinaryUpload';

export const createEvent = async (req: Request, res: Response) => {
    try {
        const {
            name,
            shortDesc,
            city,
            state,
            date,
            timing,
            registerLink,
            speakers,
            venue,
            whyAttend,
        } = req.body;

        const parsedSpeakers = JSON.parse(speakers || "[]");
        const parsedWhyAttend = JSON.parse(whyAttend || "[]");
        const parsedVenue = venue ? JSON.parse(venue) : null;

        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };

        // Upload heroImage
        const heroImage = files["heroImage"]?.[0];
        if (!heroImage) return res.status(400).json({ message: "Hero image is required." });
        const heroImageResult = await uploadToCloudinary(heroImage.path, "event_hero");

        // Create Event
        const event = await prisma.event.create({
            data: {
                name,
                shortDesc,
                city,
                state,
                date: new Date(date),
                timing,
                registerLink,
                heroImageUrl: heroImageResult.secure_url,
            },
        });

        // Upload speaker images and save
        const speakerImageFiles = files["speakerImages"] || [];
        const createdSpeakers = await Promise.all(
            parsedSpeakers.map(async (s: any, i: number) => {
                const file = speakerImageFiles[i];
                let imageUrl = s.imageUrl || "";
                if (file) {
                    const result = await uploadToCloudinary(file.path, "event_speakers");
                    imageUrl = result.secure_url;
                }
                return prisma.speaker.create({
                    data: {
                        name: s.name,
                        role: s.role,
                        imageUrl,
                        eventId: event.id,
                    },
                });
            })
        );

        // Save venue
        if (parsedVenue) {
            await prisma.venue.create({
                data: { ...parsedVenue, eventId: event.id },
            });
        }

        // Save whyAttend points
        if (parsedWhyAttend.length) {
            await prisma.whyAttendPoint.createMany({
                data: parsedWhyAttend.map((point: string) => ({
                    point,
                    eventId: event.id,
                })),
            });
        }

        res.status(201).json({ message: "Event created", event });
    } catch (err: any) {
        console.error("Event creation error:", err);
        res.status(500).json({ error: err.message });
    }
};

export const getAllEvents = async (req: Request, res: Response) => {
    try {
        const events = await prisma.event.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                speakers: true,
                venue: true,
                whyAttend: true,
            },
        });

        res.status(200).json({
            success: true,
            count: events.length,
            data: events,
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch events',
        });
    }
};


export const getEventById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const event = await prisma.event.findUnique({
            where: { id },
            include: {
                speakers: true,
                venue: true,
                whyAttend: true,
            },
        });

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        const formattedEvent = {
            id: event.id,
            name: event.name,
            shortDesc: event.shortDesc,
            heroImageUrl: event.heroImageUrl,
            city: event.city,
            state: event.state,
            date: event.date.toISOString(), // ISO for compatibility
            timing: event.timing,
            registerLink: event.registerLink,

            // Formatted nested data
            speakers: event.speakers.map((speaker) => ({
                id: speaker.id,
                name: speaker.name,
                role: speaker.role,
                imageUrl: speaker.imageUrl,
            })),

            venue: event.venue
                ? {
                    address: event.venue.address,
                    landmark: event.venue.landmark || "",
                    googleMapUrl: event.venue.googleMapUrl,
                }
                : null,

            whyAttend: event.whyAttend.map((point) => point.point),

            createdAt: event.createdAt.toISOString(),
            updatedAt: event.updatedAt.toISOString(),
        };

        res.status(200).json({ event: formattedEvent });
    } catch (error) {
        console.error("Error fetching event by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const deleteEventById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const existingEvent = await prisma.event.findUnique({
            where: { id },
        });

        if (!existingEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        await prisma.event.delete({
            where: { id },
        });

        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
