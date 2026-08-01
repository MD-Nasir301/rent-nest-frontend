
"use server";

import { CreateRentalPayload } from "@/types/type";
import { cookies } from "next/headers";


export const createRentalRequest = async (payload: CreateRentalPayload) => {
  try {
   
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/rentals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Failed to submit rental request",
      };
    }

    return {
      success: true,
      data: result?.data,
      message: result?.message || "Rental request submitted successfully",
    };
  } catch (error: any) {
    console.error("Error creating rental request:", error);
    return {
      success: false,
      message: error?.message || "Something went wrong! Please try again.",
    };
  }
};