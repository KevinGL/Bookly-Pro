import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { fakerFR as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const createSession = async (service: any, users: any[]) =>
{
    let timestamp = Date.now();
    timestamp += 24 * 60 * 60 * 1000;

    for(let i = 0 ; i < 60 ; i++)
    {
        const date = new Date(timestamp);
        
        const day = date.getDate();
        const dayOfWeek = date.getDay();
        const month = date.getMonth();
        const year = date.getFullYear();

        if(dayOfWeek !== 0 && dayOfWeek !== 6)      //Not Saturday not Sunday
        {
            let hour = 9;
            let minute = 0;

            while(1)
            {
                const start = new Date(year, month, day, hour, minute);
                const end = new Date(year, month, day, hour, minute + service.duration);
                const booked = Math.random() < 0.3;
                const randomUser = users[Math.floor(Math.random() * users.length)];
                
                await prisma.session.create({
                    data: {
                        userId : booked ? randomUser.id : null,
                        serviceId: service.id,
                        start,
                        end,
                        status: booked ? "confirmed" : "free"
                    }
                });

                minute += service.duration + 10;
                if(minute > 59)
                {
                    hour++;
                    minute -= 60;
                }
            }
        }
    }
}

export async function main()
{
    await prisma.session.deleteMany();
    await prisma.service.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    ////////////////////////////////////////////
    
    let admins = [];
    let users = [];
    
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
    users.push(user);

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
        users.push(user);
    }

    for(let i = 0 ; i < 96 ; i++)
    {
        const user = await prisma.user.create({
            data: {
                firstname: faker.person.firstName(),
                lastname: faker.person.lastName(),
                email: faker.internet.email(),
                password: await bcrypt.hash("1234", 10),
                role: "client"
            }
        });

        users.push(user);
    }

    ////////////////////

    const categories = new Map();

    let cat = await prisma.category.create({
        data: {
            name: "Photographe professionnel"
        }
    });
    categories.set("photographer", cat);

    cat = await prisma.category.create({
        data: {
            name: "Salon de coiffure / beauté"
        }
    });
    categories.set("beauty", cat);

    cat = await prisma.category.create({
        data: {
            name: "Coach bien-être / développement personnel"
        }
    });
    categories.set("comfort", cat);

    ////////////////////

    let owner = admins[Math.floor(admins.length * Math.random())];
    let services = 
    [
        {
            title: "Séance photo portrait",
            duration: 60,
            price: 80.0,
            description: "Séance en studio avec 10 photos retouchées",
            ownerId: owner.id,
            categoryId: categories.get("photographer").id
        },

        {
            title: "Shooting extérieur",
            duration: 90,
            price: 120.0,
            description: "Photos en extérieur avec lumière naturelle, 15 clichés HD",
            ownerId: owner.id,
            categoryId: categories.get("photographer").id
        },

        {
            title: "Séance photo famille",
            duration: 120,
            price: 150.0,
            description: "Shooting convivial pour familles ou couples, 20 photos retouchées",
            ownerId: owner.id,
            categoryId: categories.get("photographer").id
        },

        {
            title: "Pack book professionnel",
            duration: 150,
            price: 220.0,
            description: "Portraits pro pour CV, LinkedIn ou site web, fond neutre ou ambiance pro",
            ownerId: owner.id,
            categoryId: categories.get("photographer").id
        }
    ];

    Promise.all(
        services.map(async (service) =>
        {
            const serviceDB = await prisma.service.create({
                data: {...service}
            });

            await createSession(serviceDB, users);
        })
    );

    /////////////////

    owner = admins[Math.floor(admins.length * Math.random())];
    services = 
    [
        {
            title: "Coupe femme",
            duration: 45,
            price: 45.0,
            description: "Shampooing, coupe et brushing inclus",
            ownerId: owner.id,
            categoryId: categories.get("beauty").id
        },

        {
            title: "Coupe homme",
            duration: 30,
            price: 25.0,
            description: "Coupe + finition barbe au choix",
            ownerId: owner.id,
            categoryId: categories.get("beauty").id
        },

        {
            title: "Coloration complète",
            duration: 150,
            price: 70.0,
            description: "Application d'une couleur unique avec soins",
            ownerId: owner.id,
            categoryId: categories.get("beauty").id
        },

        {
            title: "Balayage / mèches",
            duration: 120,
            price: 95.0,
            description: "Effet lumineux et naturel, brushing inclus",
            ownerId: owner.id,
            categoryId: categories.get("beauty").id
        },

        {
            title: "Manucure complète",
            duration: 45,
            price: 35.0,
            description: "Lime, soin, pose de vernis semi-permanent",
            ownerId: owner.id,
            categoryId: categories.get("beauty").id
        }
    ];

    Promise.all(
        services.map(async (service) =>
        {
            const serviceDB = await prisma.service.create({
                data: {...service}
            });

            await createSession(serviceDB, users);
        })
    );

    /////////////////

    owner = admins[Math.floor(admins.length * Math.random())];
    services = 
    [
        {
            title: "Séance de coaching individuel",
            duration: 60,
            price: 60.0,
            description: "Travail ciblé sur vos objectifs personnels ou professionnels",
            ownerId: owner.id,
            categoryId: categories.get("comfort").id
        },

        {
            title: "Séance découverte",
            duration: 30,
            price: 0.0,
            description: "Première rencontre pour identifier vos besoins",
            ownerId: owner.id,
            categoryId: categories.get("comfort").id
        },

        {
            title: "Programme confiance en soi",
            duration: 150,
            price: 80.0,
            description: "Session complète sur la gestion du stress et affirmation de soi",
            ownerId: owner.id,
            categoryId: categories.get("comfort").id
        },

        {
            title: "Coaching de carrière",
            duration: 60,
            price: 70.0,
            description: "Accompagnement pour trouver un emploi aligné avec vos valeurs",
            ownerId: owner.id,
            categoryId: categories.get("comfort").id
        }
    ];

    Promise.all(
        services.map(async (service) =>
        {
            const serviceDB = await prisma.service.create({
                data: {...service}
            });

            await createSession(serviceDB, users);
        })
    );
    
    console.log("✅ Seed OK");
}

main();