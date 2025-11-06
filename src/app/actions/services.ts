"use server"

import { prisma } from "@/lib/prisma"

export const getAllServices = async () =>
{
    const services = await prisma.service.findMany();

    const servicesMapped = new Map();

    await Promise.all(
        services.map(async (service: any) =>
        {
            const cat = await prisma.category.findUnique({where: {id: service.categoryId}});

            let servicesByCat = servicesMapped.get(cat?.name) ?? [];
            servicesByCat.push(service);

            servicesMapped.set(cat?.name, servicesByCat);
        })
    );

    return servicesMapped;
}

export const getServicesByCatId = async (catId: number) =>
{
    let services = await prisma.service.findMany({where: {categoryId: catId}, include: { user: true }});

    return services;
}

export const getServicesByCatName = async (name: string) =>
{
    const cat = await prisma.category.findFirst({where: {name}});
    let services = await prisma.service.findMany({where: {categoryId: cat?.id}, include: { user: true }});

    return services;
}