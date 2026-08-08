"use server"
import { ICreateReviewPayload } from "@/types/type";
import { cookies } from "next/headers";

export const createReview = async (reviewData: ICreateReviewPayload) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;
    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in!",
      };
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify(reviewData),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to submit review");
    }

    return data;
  } catch (error: any) {
    throw new Error(error?.message || "Something went wrong!");
  }
};

export interface EditPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: any;
  onUpdateSuccess?: (data: any) => void;
}
