import { ICreateReviewPayload } from "@/types/type";


export const createReview = async (reviewData: ICreateReviewPayload) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
