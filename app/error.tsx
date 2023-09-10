"use client";

import EmptyState from "@/components/Listing/EmptyState";
import { useEffect } from "react";

interface ErrorStateProps {
  error: Error;
}

const ErrorState = ({ error }: ErrorStateProps) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return <EmptyState title="Uh Oh" subtitle="Something went wrong!" />;
};

export default ErrorState;
