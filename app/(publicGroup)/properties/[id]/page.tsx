import Image from "next/image";

async function getSingleProperty(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties/${id}`,
      { cache: "no-store" },
    );
    const data = await res.json();
    return data?.data || data;
  } catch {
    return null;
  }
}

export default async function PropertyDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const property = await getSingleProperty(params.id);

  if (!property)
    return <div className="p-10 text-center">Property not found!</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Title & Location */}
      <div>
        <h1 className="text-3xl font-bold">{property.title}</h1>
        <p className="text-gray-500">📍 {property.location}</p>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative h-72 w-full rounded-xl overflow-hidden bg-gray-100">
          <Image
            src={property.images?.[0] || "/placeholder.jpg"}
            alt="Main Image"
            fill
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {property.images?.slice(1, 5).map((img: string, idx: number) => (
            <div
              key={idx}
              className="relative h-35 w-full rounded-lg overflow-hidden bg-gray-100"
            >
              <Image src={img} alt="Gallery" fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Details & CTA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-bold border-b pb-2">Description</h2>
          <p className="text-gray-600">
            {property.description || "No description provided."}
          </p>
        </div>

        {/* Sidebar Box with CTA */}
        <div className="border p-6 rounded-xl space-y-4 bg-gray-50 h-fit">
          <div className="text-2xl font-bold text-blue-600">
            ৳{property.price}{" "}
            <span className="text-xs text-gray-500">/ month</span>
          </div>
          <div className="border-t pt-2 text-xs space-y-1 text-gray-600">
            <p>
              <strong>Landlord:</strong>{" "}
              {property.landlord?.name || "Verified Owner"}
            </p>
            <p>
              <strong>Contact:</strong> {property.landlord?.email || "N/A"}
            </p>
          </div>
          <button className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg text-sm hover:bg-blue-700">
            Request to Rent
          </button>
        </div>
      </div>
    </div>
  );
}
