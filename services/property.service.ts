export const getAllProperties = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return { success: false, data: [] };
    }

    const result = await res.json();
    return {
      success: true,
      data: result?.data || result || [],
    };
  } catch (error) {
    console.error("Error fetching properties:", error);
    return { success: false, data: [] };
  }
};
