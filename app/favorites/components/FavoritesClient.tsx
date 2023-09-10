import Container from "@/components/Container/Container";
import Heading from "@/components/Heading/Heading";
import ListingCard from "@/components/Listing/ListingCard";
import { Listing, User } from "@prisma/client";

interface FavoritesClientProps {
  listings?: Listing[] | null;
  currentUser?: User | null;
}

const FavoritesClient = ({ listings, currentUser }: FavoritesClientProps) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places you have favorited!"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings?.map((listing) => (
          <ListingCard
            key={listing.id}
            currentUser={currentUser}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
