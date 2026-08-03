"use server";
import { cookies } from "next/headers";

export async function getMyPaymentHistory() {
  try {
    const cookieStore = await cookies();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payments`,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: {
          tags: ["payments"],
        },
      },
    );

    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch payment history",
      data: [],
    };
  }
}

export const createPaymentSession = async (rentalId: string) => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payments/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        body: JSON.stringify({ rentalId }),
      },
    );

    return await res.json();
  } catch (error) {
    console.error("Error creating payment session:", error);
    return {
      success: false,
      message: "Something went wrong while connecting to the server.",
    };
  }
};
