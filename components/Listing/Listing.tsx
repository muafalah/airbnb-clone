import getListings from "@/actions/getListings";
import EmptyState from "./EmptyState";
import ListingCard from "./ListingCard";
import getCurrentUser from "@/actions/getCurrentUser";

const Listing = async () => {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
      {listings?.map((listing: any) => (
        <ListingCard
          key={listing.id}
          data={listing}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};

export default Listing;
