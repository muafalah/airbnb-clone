import EmptyState from "@/components/Listing/EmptyState";
import getCurrentUser from "@/actions/getCurrentUser";
import getFavorites from "@/actions/getFavorites";
import FavoritesClient from "./components/FavoritesClient";

export default async function FavoritesPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return <EmptyState title="Unauthorized" subtitle="Please login" />;

  const listings = await getFavorites();

  if (listings?.length === 0)
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings"
      />
    );

  return <FavoritesClient listings={listings} currentUser={currentUser} />;
}
