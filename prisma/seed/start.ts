import { PrismaClient, Prisma } from "@prisma/client";
import { category } from "./category";

const prisma = new PrismaClient()

async function main() {

    console.log('Start seeding to database...')
    
    await category()

    console.log('Seeding finished')
}

main()
    .catch((err) => {
        console.log(err)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
