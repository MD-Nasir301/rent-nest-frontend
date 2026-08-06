"use client";

import { useState, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowLeft,
  Loader2,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";
import { createProperty } from "@/services/landlord.service";
import { getAllCategories } from "@/services/category.service";

export default function CreatePropertyPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [newAmenity, setNewAmenity] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: 0,
    categoryId: "",
    landlordId: "",
    isAvailable: true,
    amenities: [] as string[],
    images: [] as string[],
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        const categoryData = Array.isArray(res)
          ? res
          : Array.isArray(res?.data)
            ? res.data
            : Array.isArray(res?.data?.data)
              ? res.data.data
              : [];

        setCategories(categoryData);

        if (categoryData.length > 0) {
          setFormData((prev) => ({
            ...prev,
            categoryId: categoryData[0].id || categoryData[0]._id,
          }));
        }
      } catch (err) {
        console.error("Categories loading failed:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleAddAmenity = () => {
    if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()],
      }));
      setNewAmenity("");
    }
  };

  const handleRemoveAmenity = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };

  const handleAddImage = () => {
    if (newImageUrl.trim() && !formData.images.includes(newImageUrl.trim())) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()],
      }));
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryId) return toast.error("Please select a category!");

    try {
      setLoading(true);
      const payload = {
        ...formData,
        price: Number(formData.price),
      };

      const res = await createProperty(payload);

      if (res?.success || res?.data) {
        toast.success("Property created successfully!");
        router.push("/landlord-dashboard/properties");
        router.refresh();
      } else {
        toast.error(res?.message || "Action failed");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/landlord-dashboard/properties"
            className="p-2 border rounded-xl hover:bg-slate-50 transition"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Add New Property
            </h1>
            <p className="text-sm text-slate-500">
              Fill in the details below to list your new property.
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase">
              Property Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g. Modern Apartment in Uttara"
              className="w-full mt-1.5 px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase">
                Category
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData({ ...formData, categoryId: e.target.value })
                }
                className="w-full mt-1.5 px-4 py-2.5 border rounded-xl text-sm bg-white"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat: any) => (
                  <option key={cat.id || cat._id} value={cat.id || cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase">
                Price / Rent Amount (Tk)
              </label>
              <input
                type="number"
                required
                value={formData.price || ""}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                placeholder="20500"
                className="w-full mt-1.5 px-4 py-2.5 border rounded-xl text-sm font-bold text-blue-600"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase">
              Location
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="e.g. Sector 10, Uttara, Dhaka"
              className="w-full mt-1.5 px-4 py-2.5 border rounded-xl text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Write a detailed description of the property..."
              className="w-full mt-1.5 px-4 py-2.5 border rounded-xl text-sm"
            />
          </div>

          {/* Amenities Section */}
          <div className="p-4 bg-slate-50 border rounded-2xl space-y-3">
            <label className="text-xs font-semibold text-slate-700 uppercase">
              Amenities
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddAmenity();
                  }
                }}
                placeholder="Add amenity (e.g. Wifi, CCTV) & press Enter"
                className="flex-1 px-3 py-2 border rounded-xl text-xs bg-white"
              />
              <button
                type="button"
                onClick={handleAddAmenity}
                className="bg-slate-900 hover:bg-black text-white px-4 py-2 rounded-xl text-xs font-semibold transition"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.amenities.map((item, idx) => (
                <span
                  key={idx}
                  className="bg-white border border-slate-200 px-3 py-1 rounded-full text-xs flex items-center gap-1.5 font-medium"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveAmenity(idx)}
                    className="text-slate-400 hover:text-rose-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Image URLs Section */}
          <div className="p-4 bg-slate-50 border rounded-2xl space-y-3">
            <label className="text-xs font-semibold text-slate-700 uppercase flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-blue-600" /> Image URLs
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="flex-1 px-3 py-2 border rounded-xl text-xs bg-white"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-semibold transition"
              >
                Add Image
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {formData.images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-xl overflow-hidden border aspect-video bg-slate-200"
                >
                  <img
                    src={img}
                    alt="Property"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Availability Checkbox */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isAvailable"
              checked={formData.isAvailable}
              onChange={(e) =>
                setFormData({ ...formData, isAvailable: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
            <label
              htmlFor="isAvailable"
              className="text-sm font-semibold text-slate-700 cursor-pointer"
            >
              Mark as Available for Rent
            </label>
          </div>

          {/* Actions */}
          <div className="pt-4 flex justify-end gap-3 border-t">
            <Link
              href="/landlord-dashboard/properties"
              className="px-5 py-2.5 border rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 disabled:opacity-50 transition"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Create Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
