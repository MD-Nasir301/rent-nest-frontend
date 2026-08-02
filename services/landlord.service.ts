"use server";

import { cookies } from "next/headers";

export const getLandlordProperties = async () => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/landlord/properties`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error(
        `Error ${res.status}: Failed to fetch landlord properties`,
      );
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(
      error?.message ||
        "Something went wrong. Failed to fetch landlord properties",
    );
  }
};

export const getRentalRequests = async () => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/landlord/requests`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error(
        `Error ${res.status}: Failed to fetch landlord rental requests`,
      );
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(
      error?.message ||
        "Something went wrong. Failed to fetch landlord rental requests",
    );
  }
};

export const updateRequestStatus = async (
  id: string,
  status: "APPROVED" | "REJECTED",
) => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/landlord/requests/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ status }),
      },
    );
    if (!res.ok) {
      throw new Error(`Error ${res.status}: Failed to update status`);
    }
    return await res.json();
  } catch (error: any) {
    throw new Error(
      error?.message || "Something went wrong. Failed to update status",
    );
  }
};

export const deleteProperty = async (propertyId: string) => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/landlord/properties/${propertyId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      },
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error?.message || "Failed to delete property");
  }
};

export const updateProperty = async (propertyId: string, payload: any) => {
  try {
    const cookieStore = await cookies();
    const id =
      typeof propertyId === "object"
        ? (propertyId as any)?.id || (propertyId as any)?._id
        : propertyId;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/landlord/properties/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      },
    );

    return await res.json();
  } catch (error: any) {
    throw new Error(error?.message || "Failed to update property");
  }
};

export const createProperty = async (data: any) => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/landlord/properties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to create property",
    };
  }
};
