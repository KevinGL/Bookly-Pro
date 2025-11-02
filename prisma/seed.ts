import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { fakerFR as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function main()
{
    let admins = [];
    
    let user = await prisma.user.create({
        data: 
            {
                firstname: "Kévin",
                lastname: "Gay",
                email: "kevinferrogl@gmail.com",
                password: await bcrypt.hash("admin", 10),
                role: "admin"
            }
        
    });

    admins.push(user);

    for(let i = 0 ; i < 3 ; i++)
    {
        let user = await prisma.user.create({
            data: {
                firstname: faker.person.firstName(),
                lastname: faker.person.lastName(),
                email: faker.internet.email(),
                password: await bcrypt.hash("1234", 10),
                role: "admin"
            }
        });

        admins.push(user);
    }

    for(let i = 0 ; i < 96 ; i++)
    {
        await prisma.user.create({
            data: {
                firstname: faker.person.firstName(),
                lastname: faker.person.lastName(),
                email: faker.internet.email(),
                password: await bcrypt.hash("1234", 10),
                role: "client"
            }
        });
    }

    ////////////////////

    let owner = admins[Math.floor(admins.length * Math.random())];
    let services = 
    [
        {
            title: "Séance photo portrait",
            duration: 60,
            price: 80.0,
            description: "Séance en studio avec 10 photos retouchées",
            ownerId: owner.id
        },

        {
            title: "Shooting extérieur",
            duration: 90,
            price: 120.0,
            description: "Photos en extérieur avec lumière naturelle, 15 clichés HD",
            ownerId: owner.id
        },

        {
            title: "Séance photo famille",
            duration: 120,
            price: 150.0,
            description: "Shooting convivial pour familles ou couples, 20 photos retouchées",
            ownerId: owner.id
        },

        {
            title: "Pack book professionnel",
            duration: 150,
            price: 220.0,
            description: "Portraits pro pour CV, LinkedIn ou site web, fond neutre ou ambiance pro",
            ownerId: owner.id
        }
    ];

    services.map(async (service) =>
    {
        await prisma.service.create({
            data: {...service}
        });
    });

    /////////////////

    owner = admins[Math.floor(admins.length * Math.random())];
    services = 
    [
        {
            title: "Coupe femme",
            duration: 45,
            price: 45.0,
            description: "Shampooing, coupe et brushing inclus",
            ownerId: owner.id
        },

        {
            title: "Coupe homme",
            duration: 30,
            price: 25.0,
            description: "Coupe + finition barbe au choix",
            ownerId: owner.id
        },

        {
            title: "Coloration complète",
            duration: 150,
            price: 70.0,
            description: "Application d'une couleur unique avec soins",
            ownerId: owner.id
        },

        {
            title: "Balayage / mèches",
            duration: 120,
            price: 95.0,
            description: "Effet lumineux et naturel, brushing inclus",
            ownerId: owner.id
        },

        {
            title: "Manucure complète",
            duration: 45,
            price: 35.0,
            description: "Lime, soin, pose de vernis semi-permanent",
            ownerId: owner.id
        }
    ];

    services.map(async (service) =>
    {
        await prisma.service.create({
            data: {...service}
        });
    });

    /////////////////

    owner = admins[Math.floor(admins.length * Math.random())];
    services = 
    [
        {
            title: "Séance de coaching individuel",
            duration: 60,
            price: 60.0,
            description: "Travail ciblé sur vos objectifs personnels ou professionnels",
            ownerId: owner.id
        },

        {
            title: "Séance découverte",
            duration: 30,
            price: 0.0,
            description: "Première rencontre pour identifier vos besoins",
            ownerId: owner.id
        },

        {
            title: "Programme confiance en soi",
            duration: 150,
            price: 80.0,
            description: "Session complète sur la gestion du stress et affirmation de soi",
            ownerId: owner.id
        },

        {
            title: "Coaching de carrière",
            duration: 60,
            price: 70.0,
            description: "Accompagnement pour trouver un emploi aligné avec vos valeurs",
            ownerId: owner.id
        }
    ];

    services.map(async (service) =>
    {
        await prisma.service.create({
            data: {...service}
        });
    });

    console.log("✅ Seed OK");
}

main();