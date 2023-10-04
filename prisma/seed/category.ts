import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient()

const categorySeed: Prisma.CategoryCreateInput[] = [
    {        
        name: 'Personal'
    },
    {
        name: 'Food'
    },
    {
        name: 'Study'
    },
    {
        name: 'Fitness'
    },
    {
        name: 'Business'
    },
    {
        name: 'Love'
    }
]

export const category = async () => {
    await prisma.category.createMany({
        data: categorySeed
    })
}