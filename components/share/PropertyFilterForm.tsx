"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CategoryDropdown from "./CategoryDropdown";
import { Category } from "@/types/type";

interface PropertyFilterFormProps {
  categories: Category[];
}

export default function PropertyFilterForm({
  categories,
}: PropertyFilterFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (location.trim()) params.append("location", location.trim());
    if (type) params.append("type", type);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);

    router.push(`/properties?${params.toString()}`);
  };

  const handleReset = () => {
    setLocation("");
    setType("");
    setMinPrice("");
    setMaxPrice("");
    router.push("/properties");
  };

  return (
    <form
      onSubmit={handleFilter}
      className="p-5 rounded-xl bg-white space-y-5 h-fit shadow-sm border border-gray-100"
    >
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="font-bold text-lg text-gray-900">Filter Properties</h2>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-blue-600 hover:underline font-semibold"
        >
          Reset
        </button>
      </div>

      {/* Location or Title Search */}
      <div>
        <label className="text-xs font-semibold text-gray-600 block mb-1">
          Location / Title
        </label>
        <input
          type="text"
          placeholder="Search location or title..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        />
      </div>

      {/* Category Dropdown */}
      <div>
        <label className="text-xs font-semibold text-gray-600 block mb-1">
          Property Category
        </label>
        <CategoryDropdown
          categories={categories}
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Price Range */}
      <div>
        <label className="text-xs font-semibold text-gray-600 block mb-1">
          Price Range (৳)
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-1/2 border border-gray-200 p-2 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-1/2 border border-gray-200 p-2 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-sm transition shadow-sm"
      >
        Apply Filters
      </button>
    </form>
  );
}