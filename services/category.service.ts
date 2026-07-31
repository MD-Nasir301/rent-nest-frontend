
export const getAllCategories = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
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
      data: result?.data?.categories || [],
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, data: [] };
  }
};
