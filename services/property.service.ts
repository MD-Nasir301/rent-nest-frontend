import { filterParam } from "@/types/type";

export const getAllProperties = async (searchParams?: filterParam) => {
  try {
    const query = new URLSearchParams();

    if (searchParams?.location) query.append("location", searchParams.location);
    if (searchParams?.type) query.append("type", searchParams.type);
    if (searchParams?.minPrice) query.append("minPrice", searchParams.minPrice);
    if (searchParams?.maxPrice) query.append("maxPrice", searchParams.maxPrice);

    const queryString = query.toString();
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties${
      queryString ? `?${queryString}` : ""
    }`;

    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      return { success: false, data: [] };
    }

    const result = await res.json();
    return {
      success: true,
      data: result?.data?.properties || result?.data || result || [],
    };
  } catch (error) {
    console.error("Error fetching properties:", error);
    return { success: false, data: [] };
  }
};


export const getSingleProperty = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties/${id}`,
      {
        cache: "no-store", 
      }
    );

    if (!res.ok) {
      return { success: false, data: null };
    }

    const result = await res.json();

    return {
      success: true,
      data: result?.data || result || null,
    };
  } catch (error) {
    console.error("Error fetching single property:", error);
    return { success: false, data: null };
  }
};