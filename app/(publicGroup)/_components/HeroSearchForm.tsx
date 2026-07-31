"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CategoryDropdown from "../../../components/share/CategoryDropdown";
import { Category } from "@/types/type";

interface HeroSearchFormProps {
  categories: Category[];
}

export default function HeroSearchForm({ categories }: HeroSearchFormProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.trim()) params.append("search", search.trim());
    if (selectedCategory) params.append("category", selectedCategory);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white p-3 rounded-xl shadow-lg flex flex-col md:flex-row gap-3 max-w-2xl mx-auto"
    >
      <input
        type="text"
        placeholder="Search by location or title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-800"
      />

      {/* 🔹 Reusable Category Dropdown */}
      <CategoryDropdown
        categories={categories}
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition"
      >
        Search
      </button>
    </form>
  );
}
