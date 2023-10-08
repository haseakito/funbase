export type Blog = {
    id: string
    title: string
    description: string
    image: {
        url: string,
        height: number,
        width: number
    }
    content: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    revisedAt: string
    tags: Tag[]
}

export type Tag = {
    id: string
    name: string
    image: {
        url: string,
        height: number,
        width: number
    }
    content: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    revisedAt: string
}