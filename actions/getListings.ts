import prisma from "@/libs/prismadb";

export interface IListingsParams {
  userId?: string | null;
  guestCount?: number | null;
  roomCount?: number | null;
  bathroomCount?: number | null;
  startDate?: string | null;
  endDate?: string | null;
  locationValue?: string | null;
  category?: string | null;
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      startDate,
      endDate,
      locationValue,
      category,
    } = params;

    let query: any = {};

    if (userId) query.userId = userId;

    if (category) query.category = category;

    if (roomCount)
      query.roomCount = {
        gte: +roomCount,
      };

    if (guestCount)
      query.guestCount = {
        gte: +guestCount,
      };

    if (bathroomCount)
      query.bathroomCount = {
        gte: +bathroomCount,
      };

    if (locationValue) query.locationValue = locationValue;

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
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
