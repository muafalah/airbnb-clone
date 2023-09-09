"use client";

import { useMemo } from "react";
import { Listing, User, Reservation } from "@prisma/client";

import { allCategories } from "@/components/Navbar/Categories";
import Container from "@/components/Container/Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";

interface ListingClientProps {
  reservations?: Reservation[] | null;
  listing: Listing & {
    user: User;
  };
  currentUser?: User | null;
}

const ListingClient = ({
  reservations,
  listing,
  currentUser,
}: ListingClientProps) => {
  const category = useMemo(() => {
    return allCategories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-scree-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            id={listing.id}
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
