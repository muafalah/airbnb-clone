"use client";

import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Reservation, Listing } from "@prisma/client";
import toast from "react-hot-toast";

import Container from "@/components/Container/Container";
import Heading from "@/components/Heading/Heading";
import ListingCard from "@/components/Listing/ListingCard";

interface TripsClientProps {
  reservations: (Omit<Reservation, "listing"> & { listing: Listing })[];
  currentUser?: User | null;
}

const TripsClient = ({ reservations, currentUser }: TripsClientProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation canceled");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
