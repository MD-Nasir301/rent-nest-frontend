
import { cookies } from "next/headers";

export async function getMyPaymentHistory() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payments/my-payments`, {
      headers: {
        Authorization: `${token}`,
      },
      next: {
        tags: ["payments"],
      },
    });

    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch payment history",
      data: [],
    };
  }
}