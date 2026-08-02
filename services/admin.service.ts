"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllUsers = async () => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${BASE_URL}/api/admin/users`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });
    return await res.json();
  } catch (err) {
    return { success: false, data: [] };
  }
};

export const toggleBanUser = async (userId: string, isBanned: boolean) => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${BASE_URL}/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ isBanned }),
    });
    return await res.json();
  } catch (err) {
    return { success: false };
  }
};

export const getAllProperties = async () => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${BASE_URL}/api/admin/properties`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });
    return await res.json();
  } catch (err) {
    return { success: false, data: [] };
  }
};

export const getAllRentalRequests = async () => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${BASE_URL}/api/admin/rentals`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });
    return await res.json();
  } catch (err) {
    return { success: false, data: [] };
  }
};
