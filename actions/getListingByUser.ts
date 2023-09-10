import prisma from "@/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getListingsByUser() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return [];

    let query: any = {};

    if (currentUser.id) {
      query.userId = currentUser.id;
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
