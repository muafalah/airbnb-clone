import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";
import EmptyState from "@/components/Listing/EmptyState";
import ListingClient from "./components/ListingClient";

interface IParams {
  listingId?: string;
}

export default async function ListingPage({ params }: { params: IParams }) {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <div>
      <ListingClient listing={listing} currentUser={currentUser} />
    </div>
  );
}
