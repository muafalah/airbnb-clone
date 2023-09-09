"use client";

import { User } from "@prisma/client";
import Image from "next/image";

import Heading from "@/components/Heading/Heading";
import useCountries from "@/hooks/useCountries";
import HeartButton from "@/components/Button/HeartButton";

interface ListingHeadProps {
  id: string;
  title: string;
  locationValue: string;
  imageSrc: string;
  currentUser?: User | null;
}

const ListingHead = ({
  id,
  title,
  locationValue,
  imageSrc,
  currentUser,
}: ListingHeadProps) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt="image"
          src={imageSrc}
          fill
          className="w-full"
          objectFit="cover"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
