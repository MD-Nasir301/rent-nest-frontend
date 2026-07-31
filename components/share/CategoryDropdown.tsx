"use client";

import { Category } from "@/types/type";
import React from "react";

interface CategoryDropdownProps {
  categories: Category[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  className?: string;
  defaultLabel?: string;
}

export default function CategoryDropdown({
  categories = [],
  value,
  onChange,
  name = "category",
  className = "",
  defaultLabel = "All Categories",
}: CategoryDropdownProps) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-gray-800 ${className}`}
    >
      <option value="">{defaultLabel}</option>
      {categories.map((cate) => (
        <option key={cate.id} value={cate.name}>
          {cate.name}
        </option>
      ))}
    </select>
  );
}
