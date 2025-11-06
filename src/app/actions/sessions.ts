"use server";

import { prisma } from "@/lib/prisma";

export const getSessionsByDateService = async (date: Date | string, serviceId: number) =>
{
    const d = new Date(date as any);

    const startLocal = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
    const nextLocal  = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1, 0, 0, 0, 0);

    /*console.log({
        input: d.toISOString(),
        startLocal,
        nextLocal
    });*/

    const sessions = await prisma.session.findMany({
        where: {
            serviceId,
            start: {
            gte: startLocal,
            lt:  nextLocal
            },
        },
        orderBy: { start: "asc" },
    });

    return sessions;
};
