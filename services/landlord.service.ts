export const getLandlordProperties = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/landlord/properties`,
      {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        cache: "no-store",
      },
    );

    return await res.json();
  } catch (error: any) {
    throw new Error(error?.message || "Failed to fetch landlord properties");
  }
};
