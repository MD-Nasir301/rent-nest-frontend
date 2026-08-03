import { cookies } from "next/headers";

export const getMe = async () => {
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`,
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
        cache: "no-store", 
      }
    );

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to fetch user data",
      };
    }

    const result = await res.json();
    return result;

  } catch (error) {
    return {
      success: false,
      message: "Something went wrong while fetching user data",
    };
  }
};