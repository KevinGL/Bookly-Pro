"use server"

import { prisma } from "@/lib/prisma"

export const getAllServices = async () =>
{
    const services = await prisma.service.findMany();

    return services;
}

export const getServicesByCat = async (catId: number) =>
{
    let services = await prisma.service.findMany({where: {categoryId: catId}, include: { user: true }});

    return services;
}