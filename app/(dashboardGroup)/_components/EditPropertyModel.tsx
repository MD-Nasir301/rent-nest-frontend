"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  X,
  Loader2,
  Plus,
  Trash2,
  CheckCircle2,
  ImageIcon,
} from "lucide-react";
import { updateProperty } from "@/services/landlord.service";
import { getAllCategories } from "@/services/category.service";
import { EditPropertyModalProps } from "../_actions/review";


export default function EditPropertyModal({
  isOpen,
  onClose,
  property,
  onUpdateSuccess,
}: EditPropertyModalProps) {
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
    isAvailable: true,
    amenities: [] as string[],
    images: [] as string[],
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        const data = Array.isArray(res)
          ? res
          : res?.data || res?.data?.data || [];
        setCategories(data);
      } catch (err) {
        toast.error("Failed to load categories")
      }
    };
    if (isOpen) fetchCategories();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && property) {
      setFormData({
        title: property.title || "",
        description: property.description || "",
        location: property.location || "",
        price: Number(property.price || property.rentAmount || 0),
        categoryId:
          property.categoryId ||
          property.category?.id ||
          property.category?._id ||
          "",
        isAvailable: property.isAvailable !== false,
        amenities: Array.isArray(property.amenities)
          ? [...property.amenities]
          : [],
        images: Array.isArray(property.images) ? [...property.images] : [],
      });
    }
  }, [property, isOpen]);

  const handleAddAmenity = () => {
    if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()],
      }));
      setNewAmenity("");
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryId) return toast.error("Please select a category!");

    const targetId = property?.id || property?._id;
    if (!targetId) return toast.error("Property ID not found!");

    try {
      setLoading(true);
      const payload = { ...formData, price: Number(formData.price) };

      const res = await updateProperty(targetId, payload);

      if (res?.success || res?.data) {
        toast.success("Updated successfully!");
        const updatedResult = res.data || {
          ...payload,
          id: targetId,
          _id: targetId,
        };

        if (typeof onUpdateSuccess === "function") {
          onUpdateSuccess(updatedResult);
        }
        onClose();
      } else {
        toast.error(res?.message || "Failed to update property");
      }
    } catch (error: any) {
      toast.error(error?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in duration-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Edit Property</h3>
            <p className="text-xs text-slate-500">
              Update your property details below
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
          {/* Title & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Property Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. Luxury Cottage"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Category
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData({ ...formData, categoryId: e.target.value })
                }
                className="w-full px-4 py-2.5 border rounded-xl text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
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
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              placeholder="Describe the features of your property..."
            />
          </div>

          {/* Price & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Price (Tk)
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                className="w-full px-4 py-2.5 border rounded-xl text-sm font-bold text-blue-600 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Location
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full px-4 py-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Uttara, Dhaka"
              />
            </div>
          </div>

          {/* Amenities Management */}
          <div className="p-4 bg-slate-50 rounded-2xl space-y-3 border border-slate-100">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" /> Amenities
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                placeholder="Add amenity (e.g. WiFi)"
                className="flex-1 px-3 py-2 border rounded-lg text-xs outline-none focus:border-blue-500"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddAmenity())
                }
              />
              <button
                type="button"
                onClick={handleAddAmenity}
                className="bg-slate-800 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-black transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.amenities.map((item, idx) => (
                <span
                  key={idx}
                  className="bg-white border text-[11px] px-2 py-1 rounded-md flex items-center gap-1 group"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((p) => ({
                        ...p,
                        amenities: p.amenities.filter((_, i) => i !== idx),
                      }))
                    }
                    className="text-slate-400 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Images Management */}
          <div className="p-4 bg-slate-50 rounded-2xl space-y-3 border border-slate-100">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-blue-600" /> Images (URLs)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Paste image URL here..."
                className="flex-1 px-3 py-2 border rounded-lg text-xs outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {formData.images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-xl overflow-hidden border bg-white aspect-video shadow-sm"
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                    alt="Property"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((p) => ({
                        ...p,
                        images: p.images.filter((_, i) => i !== idx),
                      }))
                    }
                    className="absolute inset-0 bg-red-600/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center gap-3 p-1">
            <input
              type="checkbox"
              id="isAvailable"
              checked={formData.isAvailable}
              onChange={(e) =>
                setFormData({ ...formData, isAvailable: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 rounded cursor-pointer"
            />
            <label
              htmlFor="isAvailable"
              className="text-sm font-medium text-slate-700 cursor-pointer"
            >
              Available for rent
            </label>
          </div>

          {/* Footer Buttons */}
          <div className="pt-6 flex justify-end gap-3 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 disabled:opacity-50 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Update Listing"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
