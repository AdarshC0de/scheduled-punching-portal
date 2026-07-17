import bcrypt from "bcryptjs";
import prisma from "../src/lib/prisma";

const seed = async () => {

    console.log("Starting database seed...");

    const superAdminRole = await prisma.role.upsert({
        where: {name: "SUPER_ADMIN"},
        update: {},
        create: {
            name: "SUPER_ADMIN",
            description: "Full system access",
        },
    });

    await prisma.role.upsert({
        where: {name: "ADMIN"},
        update: {},
        create: {
            name: "ADMIN",
            description: "Administrative access",
        },
    });

    await prisma.role.upsert({
        where: {name: "USER"},
        update: {},
        create: {
            name: "USER",
            description: "Standard user access",
        },
    });

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await prisma.user.upsert({
        where: {email: "admin@scheduledportal.com"},
        update: {},
        create: {
            firstName: "System",
            lastName: "Admin",
            email: "admin@scheduledportal.com",
            password: hashedPassword,
            roleId: superAdminRole.id,
        },
    });
    
    console.log("Database seed completed successfully.");
};

seed()
    .catch((error) => {
        console.error("Seed failed:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });