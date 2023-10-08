import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const handleAuth = async () => {
    // This code runs on your server before upload
    // Protect this API route by checking the session
    const session = await getServerSession(authOptions)
 
    // If you throw, the user will not be able to upload
    if (!session?.user) throw new Error("Unauthorized");

    // Whatever is returned here is accessible in onUploadComplete as `metadata`
    return { userId: session.user.id };
}
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    postImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        // Set permissions and file types for this FileRoute
        .middleware(async () => await handleAuth())
        .onUploadError(async ({ error }) => {
            throw new Error(error.message)
        })
        .onUploadComplete(async ({ metadata, file }) => {
        // This code RUNS ON YOUR SERVER after upload
        console.log("Upload complete for userId:", metadata.userId);
    
        console.log("file url", file.url);
    }),
    postVideo: f({ video: { maxFileSize: "4GB", maxFileCount: 1 } })
        .middleware(async () => await handleAuth())
        .onUploadError(async ({ error }) => {
            throw new Error(error.message)
        })
        .onUploadComplete(async () => {

    }),
    profileImage: f({ image: { maxFileSize: '1MB', maxFileCount: 1 }})
        .middleware(async () => await handleAuth())
        .onUploadError(({ error }) => {
            throw new Error(error.message)
        })
        .onUploadComplete(async () => {

    })

} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;