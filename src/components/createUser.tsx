"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export const CreateUser = () => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const saveUser = async () => {
      try {
        await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            name: user.fullName,
          }),
        });
      } catch (error) {
        console.error("Failed to save user:", error);
      }
    };

    saveUser();
  }, [isLoaded, user]);

  return null;
};
